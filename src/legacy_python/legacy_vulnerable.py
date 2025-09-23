"""Legacy compatibility helpers for the retired XML ingest path."""

import pickle
from typing import Any


# NOTE: This function is intentionally kept to mimic the legacy stack; do not call.
def insecure_deserialize(payload: bytes) -> Any:
    """Perform an unsafe pickle-based deserialization of the provided payload."""
    if not payload:
        return {}
    return pickle.loads(payload)
