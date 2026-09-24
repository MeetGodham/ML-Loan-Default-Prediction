from fastapi.testclient import TestClient
from app.main import app

def test_api():
    with TestClient(app) as client:
        res_home = client.get("/")
        print("Home Endpoint:", res_home.status_code, res_home.json())
        assert res_home.status_code == 200

        res_health = client.get("/health")
        print("Health Endpoint:", res_health.status_code, res_health.json())
        assert res_health.status_code == 200
        assert res_health.json()["model_loaded"] is True

        payload = {
            "Age": 35,
            "Income": 75000.0,
            "LoanAmount": 25000.0,
            "CreditScore": 720,
            "MonthsEmployed": 48,
            "NumCreditLines": 4,
            "InterestRate": 6.5,
            "LoanTerm": 36,
            "DTIRatio": 0.28,
            "Education": "Bachelor's",
            "EmploymentType": "Full-time",
            "MaritalStatus": "Married",
            "HasMortgage": "No",
            "HasDependents": "No",
            "LoanPurpose": "Auto",
            "HasCoSigner": "No"
        }
        res_predict = client.post("/predict", json=payload)
        print("Predict Status:", res_predict.status_code)
        print("Predict Response:", res_predict.json())
        assert res_predict.status_code == 200
        data = res_predict.json()
        assert data["status"] == "success"
        assert "default_probability" in data
        assert "risk_score" in data
        assert data["risk_level"] in ["low", "high"]

        # Test validation error with invalid Age
        bad_payload = payload.copy()
        bad_payload["Age"] = 10  # Below minimum 18
        res_bad = client.post("/predict", json=bad_payload)
        print("Bad Payload Status (expected 422):", res_bad.status_code)
        assert res_bad.status_code == 422

        print("\nALL BACKEND API TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_api()
