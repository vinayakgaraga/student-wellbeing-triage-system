export default function RecentActivity() {

    const activities = [
        "Student added successfully",
        "Attendance updated",
        "Academic record created",
        "Prediction generated",
    ];

    return (
        <div className="rounded-3xl bg-white/10 backdrop-blur-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] p-6">
            <h2 className="text-xl font-semibold mb-5">
                Recent Activity
            </h2>

            <ul className="space-y-4">
                {activities.map((activity, index) => (
                    <li
                        key={index}
                        className="border-b pb-2 text-gray-700"
                    >
                        {activity}
                    </li>
                ))}
            </ul>
        </div>
    );
}