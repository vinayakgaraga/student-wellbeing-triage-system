import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
    return (
        <div
            className="
            sticky
            top-6
            z-40
            mb-8
            rounded-3xl
            backdrop-blur-3xl
            bg-white/10
            border
            border-white/20
            shadow-2xl
            px-8
            py-5
            flex
            justify-between
            items-center
            "
        >

            {/* Title */}
            <div>

                <h1 className="text-2xl font-bold text-white">
                    Student Wellbeing Triage
                </h1>

                <p className="text-white/60">
                    AI Powered Student Monitoring
                </p>

            </div>


            {/* Actions */}
            <div className="flex items-center gap-5">


                {/* Search */}
                <div
                    className="
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    rounded-full
                    bg-white/10
                    border
                    border-white/20
                    backdrop-blur-xl
                    "
                >

                    <Search
                        size={18}
                        className="text-white/80"
                    />

                    <input
                        placeholder="Search..."
                        className="
                        bg-transparent
                        outline-none
                        text-white
                        placeholder:text-white/50
                        w-40
                        "
                    />

                </div>


                {/* Notification */}
                <button
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-white/10
                    border
                    border-white/20
                    flex
                    items-center
                    justify-center
                    hover:bg-white/20
                    transition
                    "
                >

                    <Bell
                        className="text-white"
                    />

                </button>


                {/* Profile */}
                <button
                    className="
                    w-12
                    h-12
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-400
                    to-blue-600
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    shadow-blue-500/40
                    "
                >

                    <UserCircle2
                        className="text-white"
                        size={30}
                    />

                </button>


            </div>

        </div>
    );
}