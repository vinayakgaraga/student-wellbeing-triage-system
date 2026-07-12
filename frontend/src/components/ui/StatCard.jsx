import CountUp from "react-countup";
import GlassCard from "./GlassCard";

export default function StatCard({
    title,
    value,
    icon,
}) {
    return (
        <GlassCard>

            <div className="text-cyan-300 mb-6">
                {icon}
            </div>

            <h2 className="text-5xl font-bold text-white">

                <CountUp
                    end={value}
                    duration={1.5}
                />

            </h2>

            <p className="text-slate-300 mt-3">
                {title}
            </p>

        </GlassCard>
    );
}