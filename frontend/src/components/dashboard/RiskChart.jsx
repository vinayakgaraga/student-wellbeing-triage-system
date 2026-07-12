import {PieChart,Pie,cell,Tooltip,Legend,ResponsiveContainer,} from "recharts";

const COLORS = [
    "#22C55E", // Low
    "#F59E0B", // Medium
    "#EF4444", // High
];

export default function RiskChart({ riskDistribution }) {

    const chartData = [
        {
            name: "Low",
            value: safe.Low,
        },
        {
            name: "Medium",
            value: safe.Medium,
        },
        {
            name: "High",
            value: safe.High,
        },
    ];
    const safe = riskDistribution || {
    Low: 0,
    Medium: 0,
    High: 0,
};

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-5">
                Student Risk Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}