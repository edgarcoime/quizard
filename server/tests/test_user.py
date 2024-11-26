from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_user_get_not_found():
    res = client.get("/api/py/user/username")
    assert res.status_code == 404

def test_user_post_not_found():
    res = client.post("/api/py/user/username")
    assert res.status_code == 401

def test_user_get_collections_not_found():
    res = client.get("/api/py/user/username/collections")
    assert res.status_code == 404
