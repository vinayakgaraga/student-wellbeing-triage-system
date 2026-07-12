import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import LoadingSpinner from "../components/ui/LoadingSpinner";
import PageHeader from "../components/ui/PageHeader";
import GlassCard from "../components/ui/GlassCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

export default function Analytics() {
  const [riskData, setRiskData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [stressData, setStressData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const res = await api.get("/analytics/");

      setRiskData(res.data.risk_distribution);
      setDeptData(res.data.department_data);
      setAttendanceData(res.data.attendance_distribution);
      setStressData(res.data.stress_data);
      setTotalStudents(res.data.total_students);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        title="Analytics Dashboard"
        subtitle="Visual insights of student wellbeing"
      />

      {/* Summary Cards */}

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

    <GlassCard className="flex flex-col gap-6 justify-center min-h-[180px]">

        <h2 className="text-white/70 text-lg font-medium">
            Total Students
        </h2>

        <h1 className="text-5xl lg:text-5xl font-bold text-white">
            {totalStudents}
        </h1>

    </GlassCard>

    <GlassCard className="min-h-[180px] flex flex-col justify-between">

        <h2 className="text-white/70 text-base font-medium">
            Low Risk
        </h2>

        <h1 className="text-4xl lg:text-5xl font-bold text-green-300 break-words">
            {riskData.find((r) => r.name === "Low")?.value || 0}
        </h1>

    </GlassCard>

    <GlassCard className="min-h-[180px] flex flex-col justify-between">

        <h2 className="text-white/70 text-base font-medium">
            High Risk
        </h2>

        <h1 className="text-4xl lg:text-5xl font-bold text-red-300 break-words">
            {riskData.find((r) => r.name === "High")?.value || 0}
        </h1>

    </GlassCard>

</div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Risk Distribution */}

        <GlassCard className="h-[500px]">

          <h2 className="text-2xl font-bold text-white mb-6">
            Risk Distribution
          </h2>

          <ResponsiveContainer width="100%" height={400}>

            <PieChart>

              <Pie
                data={riskData}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label
              >
                {riskData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </GlassCard>

        {/* Department */}

        <GlassCard className="h-[500px]">

          <h2 className="text-2xl font-bold text-white mb-6">
            Department-wise Students
          </h2>

          <ResponsiveContainer width="100%" height={400}>

            <BarChart data={deptData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="dept"
                stroke="#ffffff"
              />

              <YAxis stroke="#ffffff" />

              <Tooltip />

              <Bar
                dataKey="students"
                fill="#60a5fa"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </GlassCard>

        {/* Attendance */}

        <GlassCard className="h-[500px]">

          <h2 className="text-2xl font-bold text-white mb-6">
            Attendance Distribution
          </h2>

          <ResponsiveContainer width="100%" height={400}>

            <PieChart>

              <Pie
                data={attendanceData}
                dataKey="value"
                nameKey="name"
                outerRadius={130}
                label
              >

                <Cell fill="#22c55e" />

                <Cell fill="#ef4444" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </GlassCard>

        {/* Stress */}

        <GlassCard className="h-[500px]">

          <h2 className="text-2xl font-bold text-white mb-6">
            Average Stress Level
          </h2>

          <ResponsiveContainer width="100%" height={400}>

            <BarChart data={stressData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="student"
                stroke="#ffffff"
              />

              <YAxis stroke="#ffffff" />

              <Tooltip />

              <Bar
                dataKey="stress"
                fill="#a855f7"
                radius={[8, 8, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </GlassCard>

      </div>

    </DashboardLayout>
  );
}