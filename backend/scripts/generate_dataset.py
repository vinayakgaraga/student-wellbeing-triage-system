import random
import pandas as pd
from pathlib import Path

random.seed(42)

departments = ["CSE", "ECE", "EEE", "ME", "CE", "IT"]
genders = ["Male", "Female"]
sentiments = ["Positive", "Neutral", "Negative"]

rows = []

for student_id in range(1, 50001):

    attendance = random.randint(40, 100)
    classes_missed = random.randint(0, 40)
    mood = random.randint(1, 10)
    stress = random.randint(1, 10)
    sleep = round(random.uniform(3, 9), 1)
    energy = random.randint(1, 10)
    gpa = round(random.uniform(5, 10), 2)
    assignments = random.randint(0, 10)
    exam_days = random.randint(0, 60)
    study_hours = round(random.uniform(0, 10), 1)
    internal = random.randint(40, 100)
    lab = random.randint(40, 100)
    sentiment = random.choice(sentiments)
    visits = random.randint(0, 8)
    extracurricular = round(random.uniform(0, 12), 1)
    financial = random.randint(1, 5)
    social = random.randint(1, 5)

    score = 0

    if attendance < 70:
        score += 2

    if stress >= 8:
        score += 2

    if mood <= 3:
        score += 2

    if sleep < 5:
        score += 1

    if assignments > 5:
        score += 1

    if gpa < 6.5:
        score += 2

    if sentiment == "Negative":
        score += 2

    if financial >= 4:
        score += 1

    if social <= 2:
        score += 1

    if score >= 8:
        risk = "High"
    elif score >= 4:
        risk = "Medium"
    else:
        risk = "Low"

    rows.append({
        "student_id": student_id,
        "department": random.choice(departments),
        "year": random.randint(1, 4),
        "gender": random.choice(genders),
        "attendance_percentage": attendance,
        "classes_missed": classes_missed,
        "mood_score": mood,
        "stress_score": stress,
        "sleep_hours": sleep,
        "energy_level": energy,
        "gpa": gpa,
        "assignments_pending": assignments,
        "exam_days_left": exam_days,
        "study_hours": study_hours,
        "internal_marks": internal,
        "lab_performance": lab,
        "counselor_sentiment": sentiment,
        "counselor_visits": visits,
        "extracurricular_hours": extracurricular,
        "financial_stress": financial,
        "social_support": social,
        "risk_level": risk
    })

df = pd.DataFrame(rows)

output_dir = Path("../dataset")
output_dir.mkdir(exist_ok=True)

output_file = output_dir / "student_wellbeing_dataset.csv"

df.to_csv(output_file, index=False)

print("Dataset generated successfully!")
print(f"Rows: {len(df)}")
print(f"Saved to: {output_file.resolve()}")