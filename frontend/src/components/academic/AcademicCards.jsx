export default function AcademicCards({

    total,
    passed,
    backlog,

}) {

    const cards = [

        {
            title: "Total Records",
            value: total,
            color: "bg-blue-500",
            icon: "📚",
        },

        {
            title: "No Pending Assignments",
            value: passed,
            color: "bg-green-500",
            icon: "✅",
        },

        {
            title: "Pending Assignments",
            value: backlog,
            color: "bg-red-500",
            icon: "📝",
        },

    ];

    return (

        <div className="grid md:grid-cols-3 gap-6 mb-8">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`${card.color} rounded-2xl p-6 text-white shadow-lg hover:scale-105 transition`}
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="opacity-80">
                                {card.title}
                            </p>

                            <h2 className="text-4xl font-bold mt-2">
                                {card.value}
                            </h2>

                        </div>

                        <div className="text-5xl">
                            {card.icon}
                        </div>

                    </div>

                </div>

            ))}

        </div>

    );

}