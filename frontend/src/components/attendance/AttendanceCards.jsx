import {
  Users,
  CheckCircle,
  XCircle,
  Percent,
} from "lucide-react";

export default function AttendanceCards({
  total,
  present,
  absent,
  percentage,
}) {
  const cards = [
    {
      title: "Total Records",
      value: total,
      icon: Users,
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Present",
      value: present,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Absent",
      value: absent,
      icon: XCircle,
      gradient: "from-red-500 to-rose-600",
    },
    {
      title: "Attendance %",
      value: `${percentage}%`,
      icon: Percent,
      gradient: "from-purple-500 to-violet-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="
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
            <div
              className={`
                w-20
                h-20
                rounded-3xl
                bg-gradient-to-br
                ${card.gradient}
                flex
                items-center
                justify-center
                shadow-lg
                mb-6
              `}
            >
              <Icon className="w-10 h-10 text-white" />
            </div>

            <h3 className="text-white/70 text-lg">
              {card.title}
            </h3>

            <p className="text-5xl font-bold text-white mt-2">
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}