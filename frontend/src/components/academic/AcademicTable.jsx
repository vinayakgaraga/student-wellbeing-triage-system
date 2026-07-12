import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function AcademicTable({
    academicRecords,
    students,
    refresh,
    onEdit,
}) {

    const deleteRecord = async (id) => {

        if (!window.confirm("Delete this academic record?"))
            return;

        try {
            await api.delete(`/academic/${id}`);
            refresh();
        } catch (err) {
            console.error(err);
            alert("Failed to delete record.");
        }
    };

    return (

        <div className="overflow-x-auto rounded-3xl">

            <table className="min-w-full">

                <thead className="sticky top-0 bg-white/15 backdrop-blur-xl border-b border-white/20">

                    <tr>

                        <th className="px-6 py-5 text-left text-white font-semibold">
                            Student
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            GPA
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Assignments
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Exam Days
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Study Hours
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Internal
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Lab
                        </th>

                        <th className="px-6 py-5 text-center text-white font-semibold">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {academicRecords.length === 0 ? (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center py-10 text-gray-500"
                            >
                                No academic records found.
                            </td>

                        </tr>

                    ) : (

                        academicRecords.map((record) => {

                            const student = students.find(
                                (s) => s.id === record.student_id
                            );

                            return (

                                <tr
                                    key={record.id}
                                    className="
border-b
border-white/10
hover:bg-white/10
transition-all
duration-300
"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">

                                                {student?.name?.charAt(0).toUpperCase() || "?"}

                                            </div>

                                            <div>

                                                <h3 className="text-white font-semibold text-lg">
                                                    {student?.name || "Unknown Student"}
                                                </h3>

                                                <p className="text-white/60 text-sm">
                                                    {student?.department} • Year {student?.year}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-center">

                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                            record.gpa >= 8
                                                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                                                : record.gpa >= 6
                                                ? "bg-yellow-500/20 text-yellow-300 border border-yellow-400/30"
                                                : "bg-red-500/20 text-red-300 border border-red-400/30"
                                        }`}>
                                            {record.gpa}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-center text-white">
                                        {record.assignments_pending}
                                    </td>

                                    <td className="px-6 py-5 text-center text-white">
                                        {record.exam_days_left}
                                    </td>

                                    <td className="px-6 py-5 text-center text-white">
                                        {record.study_hours} hrs
                                    </td>

                                    <td className="px-6 py-5 text-center text-white">
                                        {record.internal_marks}
                                    </td>

                                    <td className="px-6 py-5 text-center text-white">
                                        {record.lab_performance}
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex gap-2 justify-center">

                                            <button
                                                onClick={() => onEdit(record)}
                                                className="
                                                    w-10
                                                    h-10
                                                    rounded-xl
                                                    bg-yellow-500/20
                                                    border
                                                    border-yellow-400/30
                                                    hover:bg-yellow-500
                                                    transition
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                                >
                                                <Pencil
                                                    size={18}
                                                    className="text-yellow-300"
                                                />
                                            </button>

                                            <button
                                                onClick={() => deleteRecord(record.id)}
                                                className="
                                                    w-10
                                                    h-10
                                                    rounded-xl
                                                    bg-red-500/20
                                                    border
                                                    border-red-400/30
                                                    hover:bg-red-500
                                                    transition
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >
                                                <Trash2
                                                    size={18}
                                                    className="text-red-300"
                                                />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            );

                        })

                    )}

                </tbody>

            </table>

        </div>

    );
}