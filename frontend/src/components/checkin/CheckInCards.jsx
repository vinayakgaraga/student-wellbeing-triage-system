export default function CheckInCards({ total }) {
  const cards = [
    {
      title: "Total Check-ins",
      value: total,
      color: "from-blue-500 to-indigo-600",
      icon: "📝",
    },
    {
      title: "Today's Entries",
      value: total,
      color: "from-green-500 to-emerald-600",
      icon: "📅",
    },
    {
      title: "Wellbeing Records",
      value: total,
      color: "from-purple-500 to-pink-600",
      icon: "❤️",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              shadow-lg
              mb-5
            `}
          >
            {card.icon}
          </div>

          <p className="text-white/70 text-sm">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}