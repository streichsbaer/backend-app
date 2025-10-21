from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from database.users import User


@app.route("hello")
def hello():
    id = request.args.get("id")
    stmt = text(
        "SELECT * FROM users where id=%s" % id
    )  # Query is constructed based on user inputs
    query = SQLAlchemy().session.query(User).from_statement(stmt)  # Noncompliant
    user = query.one()
    return "Hello %s" % user.username


@app.route("/yaml_safe")
def yaml_load_safe():
    token = "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"
    data = request.GET.get("data")
    data = "not_malicious"
    yaml.load(
        data, Loader=yaml.Loader
    )  # Noncompliant; Avoid using yaml.load with unsafe yaml.Loader

