import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import DashboardLayout from "../layouts/DashboardLayout";

import AttendanceCards from "../components/attendance/AttendanceCards";
import AttendanceForm from "../components/attendance/AttendanceForm";
import AttendanceTable from "../components/attendance/AttendanceTable";

import api from "../services/api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editAttendance, setEditAttendance] = useState(null);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const res = await api.get("/attendance/");
      setAttendance(res.data);
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
    loadAttendance();
    loadStudents();
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[80vh]">
          <ClipLoader color="#38bdf8" size={60} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Attendance
          </h1>

          <p className="text-white/80 mt-2">
            Monitor student attendance records
          </p>
        </div>

        <button
          onClick={() => {
            setEditAttendance(null);
            setShowForm(true);
          }}
          className="
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          hover:scale-105
          transition
          text-white
          px-6
          py-3
          rounded-2xl
          shadow-xl
          "
        >
          + Add Attendance
        </button>
      </div>

      {/* Cards */}

      <AttendanceCards
        total={attendance.length}
        present={
          attendance.filter((a) => a.status === "Present").length
        }
        absent={
          attendance.filter((a) => a.status === "Absent").length
        }
        percentage={
          attendance.length
            ? Math.round(
                (attendance.filter((a) => a.status === "Present").length /
                  attendance.length) *
                  100
              )
            : 0
        }
      />

      {/* Table */}

      <div
        className="
        mt-8
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20
        rounded-3xl
        p-6
        shadow-2xl
        "
      >
        <AttendanceTable
          attendance={attendance}
          students={students}
          refresh={loadAttendance}
          onEdit={(row) => {
            setEditAttendance(row);
            setShowForm(true);
          }}
        />
      </div>

      {/* Modal */}

      {showForm && (
        <div
          className="
          fixed
          inset-0
          bg-black/60
          backdrop-blur-sm
          flex
          items-center
          justify-center
          p-6
          z-50
          "
        >
          <div
            className="
            relative
            bg-slate-900/90
            backdrop-blur-3xl
            border
            border-white/20
            rounded-3xl
            p-8
            w-full
            max-w-2xl
            shadow-[0_15px_45px_rgba(0,0,0,.45)]
            "
          >
            {/* Close */}

            <button
              onClick={() => setShowForm(false)}
              className="
              absolute
              top-6
              right-6
              w-10
              h-10
              rounded-full
              bg-white/10
              hover:bg-red-500
              text-white
              flex
              items-center
              justify-center
              text-xl
              transition-all
              duration-300
              z-50
              "
            >
              ✕
            </button>

            {/* Form */}

            <AttendanceForm
              attendance={editAttendance || null}
              onAttendanceAdded={() => {
                loadAttendance();
                setShowForm(false);
              }}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}