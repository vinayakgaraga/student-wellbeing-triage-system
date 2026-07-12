import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import CounselorCards from "../components/counselor/CounselorCards";
import CounselorForm from "../components/counselor/CounselorForm";
import CounselorTable from "../components/counselor/CounselorTable";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";
import GlassInput from "../components/ui/GlassInput";

import api from "../services/api";

export default function Counselor() {

    const [notes, setNotes] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);
    const [search, setSearch] = useState("");

    const loadCounselor = async () => {
        try {

            setLoading(true);

            const res = await api.get("/counselor/");
            setNotes(res.data);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadStudents = async () => {
        try {

            const res = await api.get("/students/");
            setStudents(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCounselor();
        loadStudents();
    }, []);

    if (loading) {
        return (
            <DashboardLayout>
                <LoadingSpinner />
            </DashboardLayout>
        );
    }

    const filteredNotes = notes.filter((note) => {

        const student = students.find(
            (s) => s.id === note.student_id
        );

        return (
            student?.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||

            note.counselor_name
                ?.toLowerCase()
                .includes(search.toLowerCase())
        );

    });

    return (

        <DashboardLayout>

            <PageHeader
    title="Counselor"
    subtitle="Manage counseling sessions and follow-ups"
    buttonText="+ New Session"
    onClick={() => {
        setSelectedNote(null);
        setShowForm(true);
    }}
/>
            <CounselorCards
                total={notes.length}
                students={students.length}
            />

            <div className="mb-8 flex justify-center">

    <div
        className="
            relative
            w-full
            max-w-3xl
            rounded-3xl
            border border-white/20
            bg-white/10
            backdrop-blur-2xl
            shadow-2xl
            overflow-hidden
        "
    >

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>

        <div className="relative flex items-center px-6 py-4">

            <span className="text-2xl mr-4">🔍</span>

            <input

placeholder="Search student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
bg-transparent
outline-none
text-white
placeholder:text-white/50
"

/>
        </div>

    </div>

</div>


            <div
    className="
        rounded-3xl
        bg-white/10
        backdrop-blur-3xl
        border
        border-white/20
        shadow-[0_8px_32px_rgba(0,0,0,.25)]
        overflow-hidden
    "
>

    <CounselorTable
        notes={filteredNotes}
        students={students}
        refresh={loadCounselor}
        onEdit={(note) => {
            setSelectedNote(note);
            setShowForm(true);
        }}
    />

</div>

            {showForm && (

                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">

                    <div className="
        bg-slate-900/80
        backdrop-blur-3xl
        border
        border-white/20
        rounded-3xl
        p-8
        w-full
        max-w-3xl
        relative
    "
>

                        <button
                            className="
absolute
top-5
right-6
text-3xl
text-white
hover:text-red-400
transition
"
                            onClick={() => {
                                setShowForm(false);
                                setSelectedNote(null);
                            }}
                        >
                            ✕

                        </button>

                        <CounselorForm
                            note={selectedNote}
                            onNoteAdded={() => {
                                loadCounselor();
                                setSelectedNote(null);
                                setShowForm(false);
                            }}
                        />

                    </div>

                </div>

            )}

        </DashboardLayout>

    );
}