import { useState, useEffect } from "react";
import api from "../../services/api";
import { User, CalendarDays, CheckCircle } from "lucide-react";

export default function AttendanceForm({ onAttendanceAdded }) {
  const [students, setStudents] = useState([]);

  const [formData, setFormData] = useState({
    student_id: "",
    date: "",
    status: "Present",
  });

  useEffect(() => {
    api
      .get("/students/")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/attendance/", formData);

      alert("Attendance Added Successfully!");

      setFormData({
        student_id: "",
        date: "",
        status: "Present",
      });

      onAttendanceAdded();

    } catch (error) {
      console.error(error);
      alert("Failed to add attendance.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
      bg-[#111B35]
      rounded-3xl
      border
      border-white/20
      backdrop-blur-3xl
      shadow-[0_10px_40px_rgba(0,0,0,.5)]
      p-8
      space-y-6
      w-full
      "
    >
      <h2 className="text-3xl font-bold text-white mb-2">
        Mark Attendance
      </h2>

      {/* Student */}

      <div>
        <label className="flex items-center gap-2 text-white mb-2">
          <User className="w-5 h-5 text-cyan-400" />
          Student
        </label>

        <select
          name="student_id"
          value={formData.student_id}
          onChange={handleChange}
          required
          className="
          w-full
          rounded-2xl
          bg-white/10
          border
          border-white/20
          px-5
          py-3
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400
          "
        >
          <option value="" className="text-black">
            Select Student
          </option>

          {students.map((student) => (
            <option
              key={student.id}
              value={student.id}
              className="text-black"
            >
              {student.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}

      <div>
        <label className="flex items-center gap-2 text-white mb-2">
          <CalendarDays className="w-5 h-5 text-cyan-400" />
          Date
        </label>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="
          w-full
          rounded-2xl
          bg-white/10
          border
          border-white/20
          px-5
          py-3
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400
          "
        />
      </div>

      {/* Status */}

      <div>
        <label className="flex items-center gap-2 text-white mb-2">
          <CheckCircle className="w-5 h-5 text-cyan-400" />
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="
          w-full
          rounded-2xl
          bg-white/10
          border
          border-white/20
          px-5
          py-3
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400
          "
        >
          <option className="text-black" value="Present">
            Present
          </option>

          <option className="text-black" value="Absent">
            Absent
          </option>
        </select>
      </div>

      {/* Button */}

      <button
        type="submit"
        className="
        w-full
        py-4
        rounded-2xl
        bg-gradient-to-r
        from-cyan-500
        to-blue-600
        text-white
        text-lg
        font-semibold
        shadow-lg
        hover:scale-[1.02]
        transition-all
        duration-300
        "
      >
        Save Attendance
      </button>
    </form>
  );
}