"""Utilities for loading crop images from base64 strings or file paths."""
from __future__ import annotations

import base64
from pathlib import Path

from agents.utils.logger import get_logger

logger = get_logger(__name__)

_MAGIC = {
    b"\xff\xd8\xff": "image/jpeg",
    b"\x89PNG": "image/png",
    b"GIF8": "image/gif",
    b"RIFF": "image/webp",
}


def _detect_mime(data: bytes) -> str:
    for magic, mime in _MAGIC.items():
        if data[: len(magic)] == magic:
            return mime
    return "image/jpeg"


def load_image(source: str) -> tuple[bytes, str]:
    """Return (raw_bytes, mime_type) from a base64 string or a file path.

    Accepts:
    - A file path (absolute or relative) to a JPEG/PNG image.
    - A raw base64-encoded string (with or without data URI prefix).
    """
    path = Path(source)
    if path.exists() and path.is_file():
        logger.info("Loading image from file: %s", path.name)
        data = path.read_bytes()
        return data, _detect_mime(data)

    # Strip data URI prefix if present (data:image/jpeg;base64,...)
    if source.startswith("data:"):
        source = source.split(",", 1)[-1]

    try:
        data = base64.b64decode(source, validate=True)
        logger.info("Loaded image from base64 string (%d bytes)", len(data))
        return data, _detect_mime(data)
    except Exception as exc:
        raise ValueError(f"source is neither a valid file path nor valid base64: {exc}") from exc
