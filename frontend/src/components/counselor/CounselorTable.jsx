import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function CounselorTable({
    notes,
    students,
    refresh,
    onEdit,
}) {

    const deleteNote = async (id) => {

        if (!window.confirm("Delete this counseling session?"))
            return;

        try {
            await api.delete(`/counselor/${id}`);
            toast.success("Session deleted");
            refresh();
        } catch (err) {
            console.error(err);
            toast.error("Unable to delete session");
        }
    };

    return (

        <div className="overflow-x-auto">

            <table className="min-w-full">

                <thead className="bg-white/15 backdrop-blur-xl border-b border-white/20">

                    <tr>

                        {[
                            "Student",
                            "Session Date",
                            "Counselor",
                            "Notes",
                            "Recommendation",
                            "Follow-up",
                            "Actions",
                        ].map((head) => (

                            <th
                                key={head}
                                className="px-6 py-5 text-left text-white font-semibold"
                            >
                                {head}
                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {notes.length === 0 ? (

                        <tr>

                            <td
                                colSpan={7}
                                className="py-14 text-center text-white/70 text-lg"
                            >
                                No counseling sessions found
                            </td>

                        </tr>

                    ) : (

                        notes.map((note) => {

                            const student = students.find(
                                (s) => s.id === note.student_id
                            );

                            return (

                                <tr
                                    key={note.id}
                                    className="
                                        border-b
                                        border-white/10
                                        hover:bg-white/10
                                        transition-all
                                        duration-300
                                    "
                                >

                                    <td className="px-6 py-5">

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                                                    w-14
                                                    h-14
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-cyan-400
                                                    to-blue-600
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-white
                                                    font-bold
                                                    text-lg
                                                "
                                            >
                                                {student?.name?.charAt(0) || "?"}
                                            </div>

                                            <div>

                                                <h3 className="text-white font-semibold">
                                                    {student?.name || "Unknown"}
                                                </h3>

                                                <p className="text-white/60 text-sm">
                                                    {student?.department} • Year {student?.year}
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-5 text-white">
                                        {note.session_date}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className="
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-cyan-500/20
                                                border
                                                border-cyan-400/30
                                                text-cyan-200
                                                text-sm
                                            "
                                        >
                                            {note.counselor_name}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-white max-w-xs truncate">
                                        {note.notes}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className="
                                                px-4
                                                py-2
                                                rounded-full
                                                bg-green-500/20
                                                border
                                                border-green-400/30
                                                text-green-300
                                                text-sm
                                            "
                                        >
                                            {note.recommendation}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5 text-white">
                                        {note.next_followup}
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