import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/students/StudentTable";
import api from "../services/api";
import PageHeader from "../components/ui/PageHeader";
import GlassInput from "../components/ui/GlassInput";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Modal from "../components/ui/Modal";

export default function Students() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
    try {
        setLoading(true);

        const response = await api.get("/students/");
        setStudents(response.data);

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};
    useEffect(() => {
        fetchStudents();
    }, []);
    const editStudent = (student) => {
    setSelectedStudent(student);
    setShowForm(true);
};

    const deleteStudent = async (id) => {
        if (!window.confirm("Delete this student?")) return;

        try {
            await api.delete(`/students/${id}`);
            fetchStudents();
        } catch (error) {
            console.error(error);
            alert("Failed to delete student.");
        }
    };
    const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
);
if (loading) {
    return (
        <DashboardLayout>
           <LoadingSpinner />  
        </DashboardLayout>
    );
}

    return (
        <DashboardLayout>
            
            {/* Header */}
            <PageHeader
    title="Students"
    subtitle="Manage student records"
    buttonText="+ Add Student"
    onClick={() => {
        setSelectedStudent(null);
        setShowForm(true);
    }}
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

          <StudentTable
    students={filteredStudents}
    refresh={fetchStudents}
    onEdit={editStudent}
/>  
            {showForm && (

<Modal
    onClose={() => setShowForm(false)}
>

    <StudentForm
        student={selectedStudent}
        onStudentAdded={() => {
            setShowForm(false);
        }}
    />

</Modal>

)}

        </DashboardLayout>
    );
}