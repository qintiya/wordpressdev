#!/usr/bin/env python3
"""Create a database dump and wp-content/uploads archive using Docker Compose."""
from __future__ import annotations

import argparse
import datetime as dt
import pathlib
import subprocess
import sys


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=pathlib.Path, default=pathlib.Path("backups"))
    args = parser.parse_args()
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    dump = args.output_dir / f"wordpress-{stamp}.sql"
    uploads = args.output_dir / f"uploads-{stamp}.tar.gz"

    print("Exporting database…", flush=True)
    with dump.open("wb") as output:
        subprocess.run(
            ["docker", "compose", "exec", "-T", "db", "sh", "-ec",
             'MYSQL_PWD="$MARIADB_PASSWORD" exec mariadb-dump --single-transaction --quick -u"$MARIADB_USER" "$MARIADB_DATABASE"'],
            stdout=output, check=True,
        )
    if dump.stat().st_size == 0:
        dump.unlink(missing_ok=True)
        raise RuntimeError("Database dump is empty")

    print("Archiving WordPress uploads…", flush=True)
    with uploads.open("wb") as output:
        subprocess.run(
            ["docker", "compose", "exec", "-T", "wordpress", "tar", "-C", "/var/www/html/wp-content", "-czf", "-", "uploads"],
            stdout=output, check=True,
        )
    if uploads.stat().st_size == 0:
        uploads.unlink(missing_ok=True)
        raise RuntimeError("Uploads archive is empty")

    print(f"Backup created:\n  {dump}\n  {uploads}\nStore copies off the server and protect them as sensitive data.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (subprocess.CalledProcessError, FileNotFoundError, RuntimeError) as error:
        print(f"Backup failed: {error}", file=sys.stderr)
        raise SystemExit(2)
