from fastapi.testclient import TestClient
from config.database import get_db
from main import app
from core.auth import verify_user_exit 
from unittest.mock import Mock

client = TestClient(app)

def test_block_reading_private_cards(mocker):
    app.dependency_overrides = {}
    app.dependency_overrides[verify_user_exit] = lambda: Mock(id="user_id")
    app.dependency_overrides[get_db] = lambda: None
    mocker.patch("routes.card.get_card", lambda *_: Mock(collection=Mock(is_public=False, user_id="other")))
    res = client.get("/api/py/card/card_id")
    assert res.status_code == 401
    app.dependency_overrides = {}


def test_block_editing_other_ppl_cards(mocker):
    app.dependency_overrides = {}
    app.dependency_overrides[get_db] = lambda: None
    mocker.patch("routes.card.get_card", lambda *_: Mock(collection=Mock(is_public=False, user_id="other")))
    res = client.post("/api/py/card/card_id")
    assert res.status_code == 401
    app.dependency_overrides = {}

def test_cards_get_not_found():
    app.dependency_overrides = {}
    res = client.get("/api/py/card/card_id")
    assert res.status_code == 404

def test_cards_put_auth():
    app.dependency_overrides = {}
    res = client.put("/api/py/card")
    assert res.status_code == 401

def test_cards_post_auth():
    app.dependency_overrides = {}
    res = client.post("/api/py/card/card_id")
    assert res.status_code == 401

def test_cards_delete_auth():
    app.dependency_overrides = {}
    res = client.delete("/api/py/card/card_id")
    assert res.status_code == 401
