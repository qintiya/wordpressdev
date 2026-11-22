#!/usr/bin/env python3
"""Create a portable WordPress migration bundle (database + uploads + checksums)."""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import pathlib
import subprocess
import sys
import tempfile
import zipfile

ROOT = pathlib.Path(__file__).resolve().parents[1]


def sha256(path: pathlib.Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=pathlib.Path, default=pathlib.Path("migrations"))
    args = parser.parse_args()
    args.output_dir.mkdir(parents=True, exist_ok=True)
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    archive_path = args.output_dir / f"wordpress-migration-{stamp}.zip"

    with tempfile.TemporaryDirectory(prefix="wordpress-migration-") as temp_dir:
        temp = pathlib.Path(temp_dir)
        subprocess.run([sys.executable, str(ROOT / "scripts" / "backup.py"), "--output-dir", str(temp)], check=True)
        files = sorted(temp.iterdir())
        manifest = {
            "created_at_utc": stamp,
            "contents": [{"file": file.name, "size_bytes": file.stat().st_size, "sha256": sha256(file)} for file in files],
            "restore_note": "Restore only after taking a separate backup of the destination. WordPress URLs/domain changes may require a serialized-data-aware search/replace tool such as WP-CLI.",
        }
        with zipfile.ZipFile(archive_path, "w", compression=zipfile.ZIP_DEFLATED) as archive:
            for file in files:
                archive.write(file, arcname=file.name)
            archive.writestr("manifest.json", json.dumps(manifest, indent=2) + "\n")
    print(f"Migration bundle created: {archive_path}\nVerify checksums from manifest.json before restoring. This script does not overwrite a destination site.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (subprocess.CalledProcessError, OSError, zipfile.BadZipFile) as error:
        print(f"Migration export failed: {error}", file=sys.stderr)
        raise SystemExit(2)
