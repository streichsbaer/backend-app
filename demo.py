from flask import request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from database.users import User


@app.route("hello")
def hello():
    user_id = request.args.get("id")
    stmt = text("SELECT * FROM users where id=:id")
    query = SQLAlchemy().session.query(User).from_statement(stmt).params(id=user_id)
    user = query.one()
    return "Hello %s" % user.username


from django.http import HttpResponse
from django.db import connection


def hello(request):
    user_id = request.GET.get("id", "")
    cursor = connection.cursor()
    cursor.execute(
        "SELECT username FROM auth_user WHERE id=%s",
        [user_id],
    )
    row = cursor.fetchone()
    return HttpResponse("Hello %s" % row[0])


import json
import yaml


@app.route("/pickle")
def pickle_loads():
    file = request.files["json"]
    return json.load(file.stream)


@app.route("/yaml")
def yaml_load():
    data = request.GET.get("data")
    return yaml.safe_load(data)


@app.route("/yaml_safe")
def yaml_load_safe():
    data = request.GET.get("data")
    data = "not_malicious"
    return yaml.safe_load(data)
