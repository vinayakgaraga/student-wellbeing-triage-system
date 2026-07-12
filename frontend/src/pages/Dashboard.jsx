import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/dashboard/DashboardCard";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import QuickActions from "../components/dashboard/QuickActions";
import RecentActivity from "../components/dashboard/RecentActivity";
import api from "../services/api";
import AIInsights from "../components/dashboard/AIInsights";

export default function Dashboard() {
    const [data, setData] = useState({
        total_students: 0,
        attendance_records: 0,
        checkins: 0,
        academic_records: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await api.get("/dashboard/");
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <DashboardLayout>

            <div className="space-y-8 ">

                <DashboardHeader />

                {/* AI Banner */}

                <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-10 text-white shadow-2xl p-7
              hover:-translate-y-1
              hover:scale-[1.02]
              transition-all
              duration-300
            ">

                    <h1 className="text-5xl font-bold">
                        Student Wellbeing AI Dashboard
                    </h1>

                    <p className="mt-4 text-lg text-blue-100 max-w-3xl">
                        Monitor attendance, stress, academic performance
                        and predict student wellbeing using Artificial
                        Intelligence.
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                    <DashboardCard
                        title="Students"
                        value={data.total_students}
                        icon="👨‍🎓"
                        color="from-blue-500 to-indigo-600"
                    />

                    <DashboardCard
                        title="Attendance"
                        value={data.attendance_records}
                        icon="📅"
                        color="from-green-500 to-emerald-600"
                    />

                    <DashboardCard
                        title="Check-ins"
                        value={data.checkins}
                        icon="😊"
                        color="from-orange-500 to-red-500"
                    />

                    <DashboardCard
                        title="Academic"
                        value={data.academic_records}
                        icon="📚"
                        color="from-purple-500 to-pink-600"
                    />

                </div>

                {/* AI Insight */}

                <div className="space-y-8">
                

                    <h2 className="text-2xl font-bold mb-4">
                        🤖 AI Insight
                    </h2>

                    <p className="text-white/70 leading-8">

                        The AI continuously analyzes attendance,
                        stress levels, sleep patterns and academic
                        performance to identify students requiring
                        early counselling and intervention.

                    </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-8">

                    <QuickActions />

                
                    <AIInsights data={data} />

                </div>

            </div>

        </DashboardLayout>
    );
}