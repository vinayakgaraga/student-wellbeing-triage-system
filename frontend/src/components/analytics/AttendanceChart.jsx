import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AttendanceChart() {
  const data = [
    { day: "Mon", attendance: 92 },
    { day: "Tue", attendance: 88 },
    { day: "Wed", attendance: 95 },
    { day: "Thu", attendance: 90 },
    { day: "Fri", attendance: 94 },
  ];

  return (
    <div
      style={{
        marginTop: "40px",
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        Weekly Attendance Trend
      </h2>

      <LineChart
        width={950}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />

        <YAxis domain={[80, 100]} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="attendance"
          stroke="#2563EB"
          strokeWidth={3}
        />
      </LineChart>
    </div>
  );
}