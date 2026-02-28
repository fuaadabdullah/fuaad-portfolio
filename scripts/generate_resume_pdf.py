#!/usr/bin/env python3
"""Deprecated wrapper for resume PDF generation.

Use `scripts/generate-resume-pdf.js` as the canonical generator.
This wrapper delegates to the JS script to avoid output drift.
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def main() -> int:
    script_path = Path(__file__).with_name("generate-resume-pdf.js")
    url_arg = sys.argv[1] if len(sys.argv) > 1 else None

    cmd = ["node", str(script_path)]
    if url_arg:
        cmd.append(url_arg)

    print("⚠️  Deprecated: use scripts/generate-resume-pdf.js directly.")
    result = subprocess.run(cmd, check=False)
    return result.returncode


if __name__ == "__main__":
    raise SystemExit(main())
