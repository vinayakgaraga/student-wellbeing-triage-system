export default function PredictionCards({ predictions }) {

    const low = predictions.filter(
        (p) => p.risk_level === "Low"
    ).length;

    const medium = predictions.filter(
        (p) => p.risk_level === "Medium"
    ).length;

    const high = predictions.filter(
        (p) => p.risk_level === "High"
    ).length;

    const cards = [
  {
    title: "Low Risk",
    value: low,
    className:
      "bg-gradient-to-r from-green-500 to-green-700",
    icon: "🟢",
  },
  {
    title: "Medium Risk",
    value: medium,
    className:
      "bg-gradient-to-r from-amber-500 to-amber-700",
    icon: "🟡",
  },
  {
    title: "High Risk",
    value: high,
    className:
      "bg-gradient-to-r from-rose-500 to-rose-700",
    icon: "🔴",
  },
];

    return (

        <div className="grid md:grid-cols-3 gap-6 mb-8">

            {cards.map((card) => (

                <div
                    key={card.title}
                    className={`${card.className} rounded-3xl p-6 text-white shadow-xl hover:scale-105 transition`}
                >

                    <div className="flex justify-between items-center">

                        <div>

                            <p className="opacity-80">
                                {card.title}
                            </p>

                            <h1 className="text-5xl font-bold mt-3">
                                {card.value}
                            </h1>

                        </div>

                        <span className="text-6xl">
                            {card.icon}
                        </span>

                    </div>

                </div>

            ))}

        </div>

    );

}