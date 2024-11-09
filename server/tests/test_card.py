from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_cards_get_not_found():
    res = client.get("/api/py/card/card_id")
    assert res.status_code == 404

def test_cards_put_auth():
    res = client.put("/api/py/card")
    assert res.status_code == 401

def test_cards_post_auth():
    res = client.post("/api/py/card/card_id")
    assert res.status_code == 401

def test_cards_delete_auth():
    res = client.delete("/api/py/card/card_id")
    assert res.status_code == 401
