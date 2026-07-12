export default function AnalyticsCards({ data }) {
    if (!data) return null;

    const cards = [
        {
            title: "Total Students",
            value: data.total_students || 0,
            color: "from-blue-500 to-cyan-500",
            icon: "🎓",
        },
        {
            title: "Attendance Records",
            value: data.attendance_records || 0,
            color: "from-green-500 to-emerald-500",
            icon: "📅",
        },
        {
            title: "Check-ins",
            value: data.checkins || 0,
            color: "from-orange-500 to-yellow-500",
            icon: "💙",
        },
        {
            title: "Academic Records",
            value: data.academic_records || 0,
            color: "from-purple-500 to-pink-500",
            icon: "📚",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {cards.map((card, index) => (
                <div
                    key={index}
                    className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    bg-white/10
                    backdrop-blur-3xl
                    border
                    border-white/20
                    shadow-[0_8px_32px_rgba(0,0,0,.25)]
                    p-7
              hover:-translate-y-1
              hover:scale-[1.02]
              transition-all
              duration-300
            "
                >
                    <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative">
                        <div
                            className={`
                            w-14
                            h-14
                            rounded-2xl
                            bg-gradient-to-r
                            ${card.color}
                            flex
                            items-center
                            justify-center
                            text-2xl
                            mb-5
                            shadow-xl
                            `}
                        >
                            {card.icon}
                        </div>

                        <p className="text-white/70 text-sm leading-5 break-words">
                            {card.title}
                        </p>

                        <h2 className="text-4xl font-bold text-white mt-3">
                            {card.value}
                        </h2>
                    </div>
                </div>
            ))}
        </div>
    );
}