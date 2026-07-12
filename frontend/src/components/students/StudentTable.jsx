import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function StudentTable({
  students,
  refresh,
  onEdit,
}) {
  const deleteStudent = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/students/${id}`);
      toast.success("Student deleted successfully");
      refresh();
    } catch (err) {
      console.error(err);
      toast.error("Unable to delete student");
    }
  };

  return (
    <div
      className="
      rounded-3xl
      backdrop-blur-3xl
      bg-white/10
      border
      border-white/20
      shadow-[0_8px_40px_rgba(0,0,0,.30)]
      overflow-hidden
      "
    >
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="sticky top-0 bg-white/15 backdrop-blur-xl border-b border-white/20">

            <tr>

              {[
                "Student",
                "Email",
                "Department",
                "Year",
                "Section",
                "Gender",
                "Phone",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-6 py-5 text-left text-white font-semibold tracking-wide"
                >
                  {head}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {students.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="py-14 text-center text-white/70 text-lg"
                >
                  No students found
                </td>

              </tr>

            ) : (

              students.map((student) => (

                <tr
                  key={student.id}
                  className="
                  group
                  border-b
                  border-white/10
                  transition-all
                  duration-300
                  "
                >

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">

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
                        text-lg
                        font-bold
                        shadow-lg
                        "
                      >
                        {student.name?.charAt(0)}
                      </div>

                      <div>

                        <h3 className="text-white font-semibold text-lg">
                          {student.name}
                        </h3>

                        <p className="text-white/60 text-sm">
                          ID #{student.id}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">
                    {student.email}
                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">

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
                      {student.department}
                    </span>

                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">
                    {student.year}
                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">
                    {student.section}
                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">
                    {student.gender}
                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">
                    {student.phone}
                  </td>

                  <td className="px-6 py-5 bg-transparent group-hover:bg-cyan-500/10 text-white transition-all duration-300">

                    <div className="flex gap-3 justify-center">

                      <button
                        onClick={() => onEdit(student)}
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
                        onClick={() => deleteStudent(student.id)}
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

              ))

            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}