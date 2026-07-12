import CountUp from "react-countup";
import {
    Users,
    CalendarDays,
    Smile,
    GraduationCap,
} from "lucide-react";

const cards = {
    Students: {
        icon: <Users size={34} />,
        gradient: "from-blue-500 to-indigo-600",
    },
    Attendance: {
        icon: <CalendarDays size={34} />,
        gradient: "from-green-500 to-emerald-600",
    },
    "Check-ins": {
        icon: <Smile size={34} />,
        gradient: "from-yellow-500 to-orange-500",
    },
    Academic: {
        icon: <GraduationCap size={34} />,
        gradient: "from-purple-500 to-pink-600",
    },
    "Academic Records": {
        icon: <GraduationCap size={34} />,
        gradient: "from-purple-500 to-pink-600",
    },
};

export default function DashboardCard({ title, value }) {

    const card = cards[title] || cards["Students"];

    return (

        <div
           className="
rounded-3xl
bg-white/10
backdrop-blur-3xl
border
border-white/20
shadow-[0_8px_32px_rgba(0,0,0,0.25)]
p-7
              hover:-translate-y-1
              hover:scale-[1.02]
              transition-all
              duration-300
            
"
        >

            <div
                className={`
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-r
                ${card.gradient}
                flex
                items-center
                justify-center
                text-white
                shadow-lg
                `}
            >

                {card.icon}

            </div>

            <h1 className="text-5xl font-bold text-slate-900 mt-8">
                {value}
            </h1>

            <p className="text-white text-lg mt-2">

                {title}

            </p>

        </div>

    );
}