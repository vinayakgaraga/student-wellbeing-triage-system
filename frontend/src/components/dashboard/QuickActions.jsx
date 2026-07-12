import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import {
    UserPlus,
    CalendarPlus,
    Brain,
    BookOpen,
} from "lucide-react";

const actions = [
    {
        title: "Add Student",
        icon: UserPlus,
        path: "/students",
    },
    {
        title: "Attendance",
        icon: CalendarPlus,
        path: "/attendance",
    },
    {
        title: "Prediction",
        icon: Brain,
        path: "/prediction",
    },
    {
        title: "Academic",
        icon: BookOpen,
        path: "/academic",
    },
];

export default function QuickActions() {
    return (
        <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-5">
                Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => {
                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            to={action.path}
                            className="border rounded-xl p-5 hover:bg-slate-900 transition flex flex-col items-center gap-3"
                        >
                            <Icon
                                size={32}
                                className="text-blue-600"
                            />

                            <span>{action.title}</span>
                        </Link>
                    );
                })}
            </div>
        </GlassCard>
    );
}