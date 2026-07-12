export default function CounselorCards({ total, students }) {
    const cards = [
        {
            title: "Sessions",
            value: total,
            icon: "🩺",
            color: "from-cyan-500 to-blue-600",
        },
        {
            title: "Students",
            value: students,
            icon: "🎓",
            color: "from-purple-500 to-pink-600",
        },
        {
            title: "High Risk",
            value: 0,
            icon: "⚠️",
            color: "from-red-500 to-orange-500",
        },
        {
            title: "Follow-ups",
            value: total,
            icon: "📅",
            color: "from-green-500 to-emerald-600",
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            {cards.map((card, index) => (

                <div
                    key={index}
                    className="
            rounded-3xl
            bg-white/10
            backdrop-blur-3xl
            border
            border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,.25)]
            p-6
            hover:bg-white/15
            hover:scale-[1.02]
            transition-all
            duration-300
          "
                >

                    

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
                            shadow-xl
                            mb-5
                            `}
                        >
                            {card.icon}
                        </div>

                        <p className="text-white/70">
                            {card.title}
                        </p>

                        <h2 className="text-4xl font-bold text-white mt-2">
                            {card.value}
                        </h2>

                    </div>

                </div>

            ))}

        </div>
    );
}