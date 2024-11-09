from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_answer_put_auth():
    res = client.put("/api/py/submission")
    assert res.status_code == 401
