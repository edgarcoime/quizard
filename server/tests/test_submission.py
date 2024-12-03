from fastapi.testclient import TestClient
from config.database import get_db
from main import app
from unittest.mock import Mock

client = TestClient(app)
app.dependency_overrides[get_db] = lambda: None

def test_block_playing_private_flash_card(mocker):
    mocker.patch("routes.submission.get_card", lambda *_: Mock(collection=Mock(is_public=False, user_id="other")))
    res = client.put("/api/py/submission")
    assert res.status_code == 401

