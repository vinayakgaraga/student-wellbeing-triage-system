import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import PredictionCards from "../components/prediction/PredictionCards";
import GaugeComponent from "react-gauge-component";
import toast from "react-hot-toast";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";
import GlassButton from "../components/ui/GlassButton";

import api from "../services/api";

export default function Prediction() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/students/");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const student =
    predictions.length > 0
      ? students.find((s) => s.id === predictions[0].student_id)
      : null;

  const generatePrediction = async () => {
    if (!selectedStudent) {
      toast.error("Select a student");
      return;
    }

    try {
      const res = await api.get(`/predict/${selectedStudent}`);

      setPredictions([res.data]);

      toast.success("Prediction Generated Successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Prediction Failed");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="🤖 AI Risk Prediction"
        subtitle="Predict student wellbeing risk using AI"
      />

      {student && (
        <h2 className="text-2xl font-bold text-white mb-6">
          👤 {student.name}
        </h2>
      )}

      <PredictionCards predictions={predictions} />

      {/* Prediction Form */}

      <GlassCard className="mb-8">
        <div className="flex gap-4">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="
            flex-1
            rounded-2xl
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            text-white
            p-4
            outline-none
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

          <GlassButton onClick={generatePrediction}>
            🤖 Predict
          </GlassButton>
        </div>
      </GlassCard>

      {/* Result */}

      {predictions.length > 0 && (
        <GlassCard>
          <h2 className="text-3xl font-bold text-white mb-10">
            🤖 AI Prediction Result
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
                <h1 className="text-3xl font-bold">
                  AI Wellbeing Assessment
                </h1>

                <p className="mt-2 opacity-90">
                  AI analyzed attendance, stress level, sleep and academic
                  performance.
                </p>
              </div>

              <GaugeComponent
                type="semicircle"
                value={(predictions[0].confidence ?? 0) * 100}
                minValue={0}
                maxValue={100}
                arc={{
                  subArcs: [
                    {
                      limit: 40,
                      color: "#22c55e",
                    },
                    {
                      limit: 70,
                      color: "#facc15",
                    },
                    {
                      limit: 100,
                      color: "#ef4444",
                    },
                  ],
                }}
                labels={{
                  valueLabel: {
                    style: {
                      fontSize: "40px",
                      fill: "#ffffff",
                    },
                    formatTextValue: (value) =>
                      `${Math.round(value)}%`,
                  },
                }}
              />
            </div>

            <div>
              <h2 className="text-gray-300 text-xl">
                Risk Level
              </h2>

              <div
                className={`inline-block mt-3 px-8 py-3 rounded-full text-white text-3xl font-bold ${
                  predictions[0].risk_level === "Low"
                    ? "bg-green-600"
                    : predictions[0].risk_level === "Medium"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {predictions[0].risk_level}
              </div>

              <div className="mt-10">
                <h2 className="text-gray-300 text-xl mb-4">
                  AI Recommendation
                </h2>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-6">
                  {predictions[0].recommendation}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-10">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/20">
                  <p className="text-gray-300">
                    Student
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    {predictions[0].student_id}
                  </h2>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/20">
                  <p className="text-gray-300">
                    Confidence
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    {((predictions[0].confidence ?? 0) * 100).toFixed(0)}%
                  </h2>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-5 text-center border border-white/20">
                  <p className="text-gray-300">
                    Prediction
                  </p>

                  <h2 className="text-3xl font-bold text-white">
                    #{predictions[0].id}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </DashboardLayout>
  );
}