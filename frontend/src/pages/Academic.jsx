import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import AcademicCards from "../components/academic/AcademicCards";
import AcademicForm from "../components/academic/AcademicForm";
import AcademicTable from "../components/academic/AcademicTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";
import GlassInput from "../components/ui/GlassInput";
import api from "../services/api";

export default function Academic() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [search, setSearch] = useState("");

  const loadAcademic = async () => {
    try {
      setLoading(true);

      const res = await api.get("/academic/");
      setRecords(res.data);
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
    loadAcademic();
    loadStudents();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  const filteredRecords = records.filter((record) => {
    const student = students.find(
      (s) => s.id === record.student_id
    );

    return (
      student?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      student?.department
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <DashboardLayout>

      <div className="flex justify-between items-center mb-8">

        <PageHeader
          title="Academic Records"
          subtitle="Monitor student academic performance"
        />

        <GlassButton
          onClick={() => {
            setEditRecord(null);
            setShowForm(true);
          }}
        >
          + Add Record
        </GlassButton>

      </div>

      <AcademicCards
        total={records.length}
        passed={
          records.filter(
            (r) => r.assignments_pending === 0
          ).length
        }
        backlog={
          records.filter(
            (r) => r.assignments_pending > 0
          ).length
        }
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


      
        <AcademicTable
          academicRecords={filteredRecords}
          students={students}
          refresh={loadAcademic}
          onEdit={(record) => {
            setEditRecord(record);
            setShowForm(true);
          }}
        />
      

      {showForm && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">

          <GlassCard className="w-full max-w-3xl relative p-8">

            <button
              className="absolute top-5 right-6 text-2xl text-white"
              onClick={() => setShowForm(false)}
            >
              ✕
            </button>

            <AcademicForm
              record={editRecord}
              onAcademicAdded={() => {
                loadAcademic();
                setShowForm(false);
              }}
            />

          </GlassCard>

        </div>

      )}

    </DashboardLayout>
  );
}