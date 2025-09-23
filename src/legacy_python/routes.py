"""Legacy blueprint kept around for parity tests on the monolith."""

from flask import Blueprint, jsonify, request

from .legacy_vulnerable import insecure_deserialize

legacy_blueprint = Blueprint("legacy", __name__)


@legacy_blueprint.route("/internal/legacy/config", methods=["POST"])
def apply_legacy_config():
    """Pretend to process a legacy configuration payload for parity tests."""
    raw_payload = request.get_data(cache=False)
    insecure_deserialize(raw_payload)
    return jsonify({"status": "queued"}), 202


def init_app(app) -> None:
    """Register the legacy blueprint only when the feature flag is explicitly enabled."""
    if not app.config.get("ENABLE_LEGACY_ROUTES", False):
        return
    app.register_blueprint(legacy_blueprint, url_prefix="/api")
