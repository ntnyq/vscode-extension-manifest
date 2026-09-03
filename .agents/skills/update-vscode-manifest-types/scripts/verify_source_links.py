#!/usr/bin/env python3
"""Check pinned GitHub source links against supplied snapshots (standard library only)."""

import argparse
import re
import subprocess
import sys
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urlsplit


GITHUB_URL = re.compile(r"https://github\.com/[^\s<>()\[\]{}\"'`]+")
COMMIT = re.compile(r"[0-9a-f]{40}")
LINES = re.compile(r"L([1-9][0-9]*)(?:-L([1-9][0-9]*))?")


def parse_snapshots(values, parser):
    snapshots = {}
    for value in values:
        commit, separator, directory = value.partition("=")
        if not separator or not COMMIT.fullmatch(commit):
            parser.error("--snapshot must be a full lowercase commit SHA followed by =DIRECTORY")
        root = Path(directory).resolve()
        if not directory or not root.is_dir():
            parser.error(f"Snapshot directory does not exist: {directory}")
        if commit in snapshots and snapshots[commit] != root:
            parser.error(f"Multiple directories supplied for commit {commit}")
        snapshots[commit] = root
    return snapshots


def read_source(root, commit, source_path):
    parts = PurePosixPath(source_path)
    if parts.is_absolute() or ".." in parts.parts or "\\" in source_path or "\x00" in source_path:
        raise ValueError("Source path must stay within the snapshot")
    if (root / ".git").exists():
        result = subprocess.run(
            ["git", "-C", str(root), "show", f"{commit}:{source_path}"],
            capture_output=True,
            text=True,
            encoding="utf-8",
            timeout=30,
        )
        if result.returncode:
            raise ValueError(f"Cannot read committed file: {result.stderr.strip()}")
        return result.stdout.splitlines()
    source = (root / source_path).resolve()
    if not source.is_relative_to(root):
        raise ValueError("Source path resolves outside the snapshot")
    return source.read_text(encoding="utf-8").splitlines()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("files", type=Path, nargs="+", help="Reports or type files containing source links")
    parser.add_argument("--snapshot", action="append", required=True, metavar="SHA=DIRECTORY")
    parser.add_argument("--repository", default="microsoft/vscode", help="GitHub owner/repository to check")
    parser.add_argument("--show-excerpts", action="store_true")
    args = parser.parse_args()
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", args.repository):
        parser.error("--repository must be GitHub owner/repository")
    snapshots = parse_snapshots(args.snapshot, parser)
    urls = set()
    try:
        for report in args.files:
            urls.update(GITHUB_URL.findall(report.read_text(encoding="utf-8")))
    except (OSError, UnicodeError) as error:
        parser.error(str(error))

    checked = 0
    candidates = 0
    errors = []
    other_repositories = []
    cache = {}
    for url in sorted(urls):
        parsed = urlsplit(url)
        segments = parsed.path.split("/", 5)
        if len(segments) < 5 or segments[3] != "blob":
            continue
        repository = "/".join(segments[1:3])
        if repository.lower() != args.repository.lower():
            other_repositories.append(url)
            continue
        candidates += 1
        try:
            if len(segments) != 6 or not segments[5]:
                raise ValueError("Source link needs a file path")
            commit = segments[4]
            if not COMMIT.fullmatch(commit):
                raise ValueError("Use a full 40-character commit SHA, not a branch or tag")
            if commit not in snapshots:
                raise ValueError(f"No snapshot supplied for {commit}")
            span = LINES.fullmatch(parsed.fragment)
            if parsed.query or not span:
                raise ValueError("Use a canonical source URL ending in #Lstart or #Lstart-Lend")
            start, end = int(span[1]), int(span[2] or span[1])
            source_path = unquote(segments[5])
            key = (commit, source_path)
            if key not in cache:
                cache[key] = read_source(snapshots[commit], commit, source_path)
            source_lines = cache[key]
            if not 1 <= start <= end <= len(source_lines):
                raise ValueError(f"Invalid range {start}-{end}; source has {len(source_lines)} lines")
            checked += 1
            if args.show_excerpts:
                print(url)
                for number in range(start, end + 1):
                    print(f"{number}: {source_lines[number - 1]}")
        except (OSError, UnicodeError, ValueError, subprocess.TimeoutExpired) as error:
            errors.append(f"{url}\n  {error}")

    if not candidates:
        errors.append(f"No source blob links for {args.repository} found; nothing was validated")
    for error in errors:
        print(error, file=sys.stderr)
    print(f"Verified {checked}/{candidates} unique {args.repository} source links; {len(errors)} error(s).")
    for url in other_repositories:
        print(f"Other repository, not checked in this run: {url}")
    print("This checks source paths and line ranges, not archive provenance or the meaning of each claim.")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
