
import GlassCard from "../ui/GlassCard";
export default function AIInsights({ data }) {

    return (

        <GlassCard className="p-8">

            <h2 className="text-2xl font-bold mb-6">
                🤖 AI Insights
            </h2>

            <div className="space-y-4">

                <div className="bg-green-100 text-green-700 p-4 rounded-xl">
                    🟢 Low Risk Students : <b>{data.low_risk}</b>
                </div>

                <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl">
                    🟡 Medium Risk Students : <b>{data.medium_risk}</b>
                </div>

                <div className="bg-red-100 text-red-700 p-4 rounded-xl">
                    🔴 High Risk Students : <b>{data.high_risk}</b>
                </div>

            </div>

        </GlassCard>

    );

}