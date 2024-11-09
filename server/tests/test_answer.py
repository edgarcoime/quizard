from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_answer_put_auth():
    res = client.put("/api/py/answer")
    assert res.status_code == 401

def test_answewr_post_auth():
    res = client.post("/api/py/answer/answer_id")
    assert res.status_code == 401

def test_answer_delete_auth():
    res = client.delete("/api/py/answer/answer_id")
    assert res.status_code == 401

