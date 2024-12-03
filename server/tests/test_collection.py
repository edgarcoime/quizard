from fastapi.testclient import TestClient
from config.database import get_db
from main import app
from core.auth import verify_user_exit 
from unittest.mock import Mock

client = TestClient(app)
app.dependency_overrides[get_db] = lambda: None

def test_block_creating_collection_already_exists(mocker):
    app.dependency_overrides[verify_user_exit] = lambda: Mock(id="user_id")
    mocker.patch("routes.collection.get_collection_by_slug", lambda *_: {"id": "exists"})
    res = client.put("/api/py/collection", json={ "slug": 'slug', "title": "title", "is_public": True })
    assert res.status_code == 409
    app.dependency_overrides = {}

def test_block_updating_collection_non_owner(mocker):
    app.dependency_overrides[verify_user_exit] = lambda: Mock(id="user_id")
    mocker.patch("routes.collection.get_collection_by_slug", lambda *_: {"id": "exists"})
    mocker.patch("routes.collection.get_collection", lambda *_: Mock(user_id="other"))
    res = client.post("/api/py/collection/id", json={"title": "title", "is_public": True })
    assert res.status_code == 401
    app.dependency_overrides = {}

def test_block_creating_collection_unauthorized():
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
