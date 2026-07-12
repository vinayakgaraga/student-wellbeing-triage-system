import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Smile,
  MessageSquare,
  BookOpen,
  Brain,
  BarChart3,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Students", path: "/students", icon: Users },
  { name: "Attendance", path: "/attendance", icon: CalendarDays },
  { name: "Check-ins", path: "/checkins", icon: Smile },
  { name: "Counselor", path: "/counselor", icon: MessageSquare },
  { name: "Academic", path: "/academic", icon: BookOpen },
  { name: "Prediction", path: "/prediction", icon: Brain },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside
      className="
      w-72
      min-h-screen
      sticky
      top-0
      flex
      flex-col
      px-6
      py-8
      backdrop-blur-3xl
      bg-white/10
      border-r
      border-white/20
      shadow-[0_8px_40px_rgba(0,0,0,.35)]
      text-white
      "
    >
      {/* Logo */}
      <div className="text-center pb-8 border-b border-white/20">

        <div
          className="
          w-24
          h-24
          mx-auto
          rounded-full
          bg-gradient-to-r
          from-cyan-400
          to-blue-600
          flex
          items-center
          justify-center
          text-5xl
          shadow-[0_0_40px_rgba(0,180,255,.45)]
          "
        >
          🎓
        </div>

        <h1 className="text-4xl font-extrabold mt-6 tracking-wide">
          Wellbeing AI
        </h1>

        <p className="text-white/70 text-lg mt-2">
          Student Monitoring System
        </p>

      </div>

      {/* Menu */}
      <nav className="flex-1 mt-8 space-y-3">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                transition-all
                duration-300

                ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_30px_rgba(0,180,255,.45)]"
                    : "hover:bg-white/10 hover:translate-x-2 hover:shadow-lg"
                }
              `}
            >
              <Icon size={24} />

              <span className="font-semibold text-lg">
                {item.name}
              </span>

            </NavLink>

          );

        })}

      </nav>

      {/* Profile */}

      <div className="mt-8 pt-6 border-t border-white/20">

        <div
          className="
          flex
          items-center
          gap-4
          rounded-2xl
          bg-white/10
          border
          border-white/20
          backdrop-blur-xl
          p-4
          "
        >

          <div
            className="
            w-14
            h-14
            rounded-full
            bg-gradient-to-r
            from-cyan-400
            to-blue-600
            flex
            items-center
            justify-center
            text-lg
            font-bold
            shadow-lg
            "
          >
            A
          </div>

          <div>

            <h3 className="font-semibold text-lg">
              Administrator
            </h3>

            <p className="text-white/70 text-sm">
              System Admin
            </p>

          </div>

        </div>

      </div>

    </aside>
  );
}