from fastapi.testclient import TestClient
from config.database import get_db
from main import app
from core.auth import verify_user_return

client = TestClient(app)
app.dependency_overrides[get_db] = lambda: None

def test_user_found(mocker):
    app.dependency_overrides[verify_user_return] = lambda: None
    mocker.patch("routes.user.get_user_by_id_or_username", lambda *_: {"id": "user"})
    res = client.get("/api/py/user/username")
    assert res.json() == { "id": "user" }
    app.dependency_overrides = {}

def test_user_not_found(mocker):
    app.dependency_overrides[verify_user_return] = lambda: None
    mocker.patch("routes.user.get_user_by_id_or_username", lambda *_: None)
    res = client.get("/api/py/user/username")
    assert res.status_code == 404
    app.dependency_overrides = {}

def test_block_user_editing_other_ppl(mocker):
    mocker.patch("routes.user.get_user_by_id_or_username", lambda *_: {"username": "other"})
    res = client.post("/api/py/user/other")
    assert res.status_code == 401
    app.dependency_overrides = {}

def test_user_post_not_found():
    res = client.post("/api/py/user/username")
    assert res.status_code == 401

def test_user_get_collections_not_found():
    res = client.get("/api/py/user/username/collections")
    assert res.status_code == 404
