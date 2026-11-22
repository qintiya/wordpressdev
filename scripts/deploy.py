#!/usr/bin/env python3
"""Validate Compose config and safely rebuild/start the stack."""
from __future__ import annotations

import argparse
import subprocess
import sys


def run(*command: str) -> None:
    print("+", " ".join(command), flush=True)
    subprocess.run(command, check=True)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--yes", action="store_true", help="skip the interactive confirmation")
    args = parser.parse_args()

    run("docker", "compose", "config", "--quiet")
    if not args.yes:
        answer = input("This will build and start/update services in this Compose project. Continue? [y/N] ")
        if answer.strip().lower() not in {"y", "yes"}:
            print("Cancelled; no services were changed.")
            return 1
    run("docker", "compose", "build")
    run("docker", "compose", "up", "-d")
    print("Deployment command completed. Check status with: docker compose ps")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (subprocess.CalledProcessError, FileNotFoundError) as error:
        print(f"Deployment failed: {error}", file=sys.stderr)
        raise SystemExit(2)
