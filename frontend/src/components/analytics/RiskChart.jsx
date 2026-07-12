import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

export default function RiskChart({ riskDistribution }) {
  const safe = riskDistribution || {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  const chartData = [
    { name: "Low", value: safe.Low },
    { name: "Medium", value: safe.Medium },
    { name: "High", value: safe.High },
  ];

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Student Risk Distribution</h2>

      
        <PieChart width={500} height={300}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      
    </div>
  );
}