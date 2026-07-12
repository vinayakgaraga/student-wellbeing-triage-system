import { useState, useEffect } from "react";
import api from "../../services/api";

export default function CheckInForm({
    checkin,
    onCheckInAdded,
}) {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        student_id: "",
        date: "",
        mood: "Happy",
        stress_level: 5,
        sleep_hours: 8,
    });

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        if (checkin) {
            setFormData({
                student_id: checkin.student_id || "",
                date: checkin.date || "",
                mood: checkin.mood || "Happy",
                stress_level: checkin.stress_level || 5,
                sleep_hours: checkin.sleep_hours || 8,
            });
        }
    }, [checkin]);

    const loadStudents = async () => {
        try {
            const res = await api.get("/students/");
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                student_id: Number(formData.student_id),
                stress_level: Number(formData.stress_level),
                sleep_hours: Number(formData.sleep_hours),
            };

            if (checkin) {
                await api.put(`/checkins/${checkin.id}`, payload);
            } else {
                await api.post("/checkins/", payload);
            }

            alert(
                checkin
                    ? "Check-in Updated Successfully!"
                    : "Check-in Added Successfully!"
            );

            setFormData({
                student_id: "",
                date: "",
                mood: "Happy",
                stress_level: 5,
                sleep_hours: 8,
            });

            onCheckInAdded();

        } catch (err) {
            console.error(err);
            alert("Failed to save check-in.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <h2 className="text-3xl font-bold">
                {checkin
                    ? "Edit Daily Check-in"
                    : "New Daily Check-in"}
            </h2>

            <div className="grid grid-cols-2 gap-5">

                <div>
                    <label className="font-medium">
                        Student
                    </label>

                    <select
    name="student_id"
    value={formData.student_id}
    onChange={handleChange}
    className="
        mt-2
        w-full
        rounded-xl
        p-3
        bg-slate-900
        text-white
        border
        border-white/20
    "
    required
>
    <option
        value=""
        style={{
            color: "black",
            backgroundColor: "white",
        }}
    >
        Select Student
    </option>

    {students.map((student) => (
        <option
            key={student.id}
            value={student.id}
            style={{
                color: "black",
                backgroundColor: "white",
            }}
        >
            {student.name}
        </option>
    ))}
</select>
                </div>

                <div>
                    <label className="font-medium">
                        Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium">
                        Mood
                    </label>

                    <select
                        name="mood"
                        value={formData.mood}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    >
                        <option>Happy</option>
                        <option>Neutral</option>
                        <option>Sad</option>
                        <option>Anxious</option>
                        <option>Stressed</option>
                    </select>
                </div>

                <div>
                    <label className="font-medium">
                        Sleep Hours
                    </label>

                    <input
                        type="number"
                        step="0.5"
                        name="sleep_hours"
                        value={formData.sleep_hours}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />
                </div>

            </div>

            <div>

                <label className="font-medium">
                    Stress Level
                </label>

                <input
                    type="range"
                    min="1"
                    max="10"
                    name="stress_level"
                    value={formData.stress_level}
                    onChange={handleChange}
                    className="w-full mt-3"
                />

                <div className="text-center font-semibold mt-2 text-blue-600">
                    {formData.stress_level}/10
                </div>

            </div>

            <div className="flex justify-end">

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                    {checkin
                        ? "Update Check-in"
                        : "Save Check-in"}
                </button>

            </div>

        </form>
    );
}