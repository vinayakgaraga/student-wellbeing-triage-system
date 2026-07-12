import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
)

from xgboost import XGBClassifier


# -------------------------
# Load Dataset
# -------------------------
df = pd.read_csv("dataset/student_wellbeing_dataset.csv")

# -------------------------
# Encode Categorical Columns
# -------------------------
department_encoder = LabelEncoder()
gender_encoder = LabelEncoder()
sentiment_encoder = LabelEncoder()
risk_encoder = LabelEncoder()

df["department"] = department_encoder.fit_transform(df["department"])
df["gender"] = gender_encoder.fit_transform(df["gender"])
df["counselor_sentiment"] = sentiment_encoder.fit_transform(
    df["counselor_sentiment"]
)
df["risk_level"] = risk_encoder.fit_transform(df["risk_level"])

# -------------------------
# Features & Target
# -------------------------
X = df.drop(columns=["student_id", "risk_level"])
y = df["risk_level"]

feature_columns = X.columns.tolist()

# -------------------------
# Train/Test Split
# -------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y,
)

# -------------------------
# Train Model
# -------------------------
model = XGBClassifier(
    n_estimators=200,
    max_depth=6,
    learning_rate=0.1,
    random_state=42,
)

model.fit(X_train, y_train)

# -------------------------
# Evaluation
# -------------------------
predictions = model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, predictions))
print("\nClassification Report\n")
print(classification_report(y_test, predictions))

print("\nConfusion Matrix\n")
print(confusion_matrix(y_test, predictions))

# -------------------------
# Save Models
# -------------------------
os.makedirs("saved_models", exist_ok=True)

joblib.dump(model, "saved_models/wellbeing_model.pkl")
joblib.dump(risk_encoder, "saved_models/risk_encoder.pkl")
joblib.dump(department_encoder, "saved_models/department_encoder.pkl")
joblib.dump(gender_encoder, "saved_models/gender_encoder.pkl")
joblib.dump(sentiment_encoder, "saved_models/sentiment_encoder.pkl")
joblib.dump(feature_columns, "saved_models/feature_columns.pkl")

print("\n✅ Model Saved Successfully!")