import { useState, useEffect } from "react";
import api from "../services/api";

export default function StudentForm({ student, onStudentAdded }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        department: "",
        year: "",
        section: "",
        gender: "",
        phone: "",
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name || "",
                email: student.email || "",
                department: student.department || "",
                year: student.year || "",
                section: student.section || "",
                gender: student.gender || "",
                phone: student.phone || "",
            });
        } else {
            setFormData({
                name: "",
                email: "",
                department: "",
                year: "",
                section: "",
                gender: "",
                phone: "",
            });
        }
    }, [student]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (student) {
                await api.put(`/students/${student.id}`, formData);
                alert("Student Updated Successfully!");
            } else {
                await api.post("/students/", formData);
                alert("Student Added Successfully!");
            }

            onStudentAdded();

        } catch (error) {
            console.error(error);
            alert("Operation Failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            />

            <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            />

            <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            />

            <input
                type="text"
                name="section"
                placeholder="Section"
                value={formData.section}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            />

            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border rounded-xl p-3"
                required
            >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
            </select>

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-xl p-3 md:col-span-2"
                required
            />

            <button
                type="submit"
                className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
                {student ? "Update Student" : "Add Student"}
            </button>
        </form>
    );
}