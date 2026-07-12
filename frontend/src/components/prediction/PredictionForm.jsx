import { useState } from "react";


export default function PredictionForm({ onPredict }) {
    const [studentId, setStudentId] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!studentId) {
            alert("Enter Student ID");
            return;
        }

        onPredict(studentId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Predict Student Risk</h2>

            <input
                type="number"
                placeholder="Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
            />

            <br /><br />

            <button type="submit">
                Predict
            </button>
        </form>
    );
}