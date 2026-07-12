export default function PredictionResult({ result }) {

    if (!result) return null;

    return (
        <div style={{ marginTop: "30px" }}>
            <h2>Prediction Result</h2>

            <p><strong>Student ID:</strong> {result.student_id}</p>

            <p><strong>Risk Level:</strong> {result.risk_level}</p>

            <p><strong>Risk Score:</strong> {result.risk_score}</p>

            <p><strong>Recommendation:</strong> {result.recommendation}</p>
        </div>
    );
}