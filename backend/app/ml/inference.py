import joblib
import pandas as pd

# Load saved files
model = joblib.load("saved_models/wellbeing_model.pkl")

risk_encoder = joblib.load("saved_models/risk_encoder.pkl")
department_encoder = joblib.load("saved_models/department_encoder.pkl")
gender_encoder = joblib.load("saved_models/gender_encoder.pkl")
sentiment_encoder = joblib.load("saved_models/sentiment_encoder.pkl")
feature_columns = joblib.load("saved_models/feature_columns.pkl")


def predict_risk(data: dict):

    df = pd.DataFrame([data])

    df["department"] = department_encoder.transform(df["department"])
    df["gender"] = gender_encoder.transform(df["gender"])
    df["counselor_sentiment"] = sentiment_encoder.transform(df["counselor_sentiment"])

    df = df[feature_columns]

    prediction = model.predict(df)[0]

    probability = model.predict_proba(df).max()

    risk = risk_encoder.inverse_transform([prediction])[0]

    return risk, probability