import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DepartmentChart({ departments }) {
  const data = departments || [];

  return (
    <div
      style={{
        marginTop: "40px",
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Department-wise Students</h2>

      <BarChart
        width={700}
        height={350}
        data={data}
        margin={{
          top: 20,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="department" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="students"
          fill="#2563EB"
        />
      </BarChart>
    </div>
  );
}