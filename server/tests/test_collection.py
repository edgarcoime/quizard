from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_collection_put_auth():
    res = client.put("/api/py/collection")
    assert res.status_code == 401

def test_collection_post_auth():
    res = client.post("/api/py/collection/collection_id")
    assert res.status_code == 401

def test_collection_get_not_found():
    res = client.get("/api/py/collection/collection_id")
    assert res.status_code == 404

def test_collection_get_cards_not_found():
    res = client.get("/api/py/collection/collection_id/cards")
    assert res.status_code == 404
