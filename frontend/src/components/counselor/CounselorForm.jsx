import { useState, useEffect } from "react";
import api from "../../services/api";

export default function CounselorForm({
    note,
    onNoteAdded,
}) {
    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        student_id: "",
        counselor_name: "",
        session_date: "",
        notes: "",
        recommendation: "",
        next_followup: "",
    });

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        if (note) {
            setFormData({
                student_id: note.student_id || "",
                counselor_name: note.counselor_name || "",
                session_date: note.session_date || "",
                notes: note.notes || "",
                recommendation: note.recommendation || "",
                next_followup: note.next_followup || "",
            });
        }
    }, [note]);

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
            };

            if (note) {
                await api.put(
                    `/counselor/${note.id}`,
                    payload
                );
            } else {
                await api.post(
                    "/counselor/",
                    payload
                );
            }

            alert(
                note
                    ? "Session Updated Successfully!"
                    : "Session Added Successfully!"
            );

            setFormData({
                student_id: "",
                counselor_name: "",
                session_date: "",
                notes: "",
                recommendation: "",
                next_followup: "",
            });

            onNoteAdded();

        } catch (err) {
            console.error(err);
            alert("Failed to save session.");
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <h2 className="text-3xl font-bold">

                {note
                    ? "Edit Counseling Session"
                    : "New Counseling Session"}

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
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    >

                        <option value="">
                            Select Student
                        </option>

                        {students.map((student) => (

                            <option
                                key={student.id}
                                value={student.id}
                            >
                                {student.name}
                            </option>

                        ))}

                    </select>

                </div>

                <div>

                    <label className="font-medium">
                        Counselor
                    </label>

                    <input
                        name="counselor_name"
                        value={formData.counselor_name}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Session Date
                    </label>

                    <input
                        type="date"
                        name="session_date"
                        value={formData.session_date}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Next Follow-up
                    </label>

                    <input
                        type="date"
                        name="next_followup"
                        value={formData.next_followup}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                    />

                </div>

            </div>

            <div>

                <label className="font-medium">
                    Counseling Notes
                </label>

                <textarea
                    rows="5"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl p-3"
                    required
                />

            </div>

            <div>

                <label className="font-medium">
                    Recommendation
                </label>

                <textarea
                    rows="3"
                    name="recommendation"
                    value={formData.recommendation}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl p-3"
                    required
                />

            </div>

            <div className="flex justify-end gap-4">

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >

                    {note ? "Update Session" : "Save Session"}

                </button>

            </div>

        </form>

    );
}