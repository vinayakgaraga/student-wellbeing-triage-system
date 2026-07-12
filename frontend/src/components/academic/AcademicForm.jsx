import { useState, useEffect } from "react";
import api from "../../services/api";

export default function AcademicForm({
    record,
    onAcademicAdded,
}) {

    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState({
        student_id: "",
        gpa: "",
        assignments_pending: "",
        exam_days_left: "",
        study_hours: "",
        internal_marks: "",
        lab_performance: "",
    });

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        if (record) {
            setFormData({
                student_id: record.student_id || "",
                gpa: record.gpa || "",
                assignments_pending: record.assignments_pending || "",
                exam_days_left: record.exam_days_left || "",
                study_hours: record.study_hours || "",
                internal_marks: record.internal_marks || "",
                lab_performance: record.lab_performance || "",
            });
        }
    }, [record]);

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
                student_id: Number(formData.student_id),
                gpa: Number(formData.gpa),
                assignments_pending: Number(formData.assignments_pending),
                exam_days_left: Number(formData.exam_days_left),
                study_hours: Number(formData.study_hours),
                internal_marks: Number(formData.internal_marks),
                lab_performance: Number(formData.lab_performance),
            };

            if (record) {
                await api.put(`/academic/${record.id}`, payload);
            } else {
                await api.post("/academic/", payload);
            }

            alert(
                record
                    ? "Academic Record Updated Successfully!"
                    : "Academic Record Added Successfully!"
            );

            setFormData({
                student_id: "",
                gpa: "",
                assignments_pending: "",
                exam_days_left: "",
                study_hours: "",
                internal_marks: "",
                lab_performance: "",
            });

            onAcademicAdded();

        } catch (err) {
            console.error(err);
            alert("Failed to save academic record.");
        }
    };

    return (

        <form onSubmit={handleSubmit} className="space-y-6">

            <h2 className="text-3xl font-bold">

                {record ? "Edit Academic Record" : "New Academic Record"}

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
                        GPA
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="gpa"
                        value={formData.gpa}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Assignments Pending
                    </label>

                    <input
                        type="number"
                        name="assignments_pending"
                        value={formData.assignments_pending}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Exam Days Left
                    </label>

                    <input
                        type="number"
                        name="exam_days_left"
                        value={formData.exam_days_left}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Study Hours
                    </label>

                    <input
                        type="number"
                        step="0.5"
                        name="study_hours"
                        value={formData.study_hours}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

                <div>

                    <label className="font-medium">
                        Internal Marks
                    </label>

                    <input
                        type="number"
                        step="0.1"
                        name="internal_marks"
                        value={formData.internal_marks}
                        onChange={handleChange}
                        className="mt-2 w-full border rounded-xl p-3"
                        required
                    />

                </div>

            </div>

            <div>

                <label className="font-medium">
                    Lab Performance
                </label>

                <input
                    type="number"
                    step="0.1"
                    name="lab_performance"
                    value={formData.lab_performance}
                    onChange={handleChange}
                    className="mt-2 w-full border rounded-xl p-3"
                    required
                />

            </div>

            <div className="flex justify-end">

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
                >
                    {record ? "Update Record" : "Save Record"}
                </button>

            </div>

        </form>

    );
}