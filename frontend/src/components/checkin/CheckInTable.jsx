import { Pencil, Trash2 } from "lucide-react";
import api from "../../services/api";

export default function CheckInTable({
    checkins,
    students,
    refresh,
    onEdit,
}) {

    const deleteCheckIn = async (id) => {

        if (!window.confirm("Delete this check-in?"))
            return;

        try {
            await api.delete(`/checkins/${id}`);
            refresh();
        } catch (err) {
            console.error(err);
            alert("Failed to delete check-in.");
        }
    };

    return (

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl">

            <table className="min-w-full rounded-3xl overflow-hidden">

                <thead className="bg-white/15 backdrop-blur-lg">

                    <tr>

                        <th className="px-6 py-5 text-left">
                            Student
                        </th>

                        <th className="px-6 py-5 text-left font-semibold text-white">
                            Date
                        </th>

                        <th className="px-6 py-5 text-left font-semibold text-white">
                            Mood
                        </th>

                        <th className="px-6 py-5 text-left font-semibold text-white">
                            Stress
                        </th>

                        <th className="px-6 py-5 text-left font-semibold text-white">
                            Sleep
                        </th>

                        <th className="px-6 py-5 text-center font-semibold text-white">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody className="divide-y divide-white/10">

                    {checkins.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center py-12 text-gray-300"
                            >
                                No check-ins found.
                            </td>

                        </tr>

                    ) : (

                        checkins.map((checkin) => {

                            const student = students.find(
                                (s) => s.id === checkin.student_id
                            );

                            return (

                                <tr
                                    key={checkin.id}
                                    className="hover:bg-white/10
        transition-all
        duration-300"
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold">

                                                {student?.name?.charAt(0).toUpperCase() || "?"}

                                            </div>

                                            <div>

                                                <h3 className="font-semibold text-white">
                                                    {student?.name || "Unknown Student"}
                                                </h3>

                                                <p className="text-sm text-gray-300">
                                                    {student?.department} • Year {student?.year}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-white">
                                        {checkin.date}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                checkin.mood === "Happy"
                                                    ? "bg-green-100 text-green-700"
                                                    : checkin.mood === "Neutral"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : checkin.mood === "Sad"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-purple-100 text-purple-700"
                                            }`}
                                        >
                                            {checkin.mood}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="font-semibold text-white">
                                            {checkin.stress_level}/10
                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-white">
                                        {checkin.sleep_hours} hrs
                                    </td>

                                    <td className="px-6 py-5">

                                        <div className="flex gap-3 justify-center">

                                           <button
                                                onClick={() => onEdit(note)}
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
                                                onClick={() => deleteNote(note.id)}
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