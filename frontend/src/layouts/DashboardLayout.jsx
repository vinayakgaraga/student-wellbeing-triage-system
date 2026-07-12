import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div
      className="
      flex
      min-h-screen
      bg-gradient-to-br
      from-[#07152f]
      via-[#132d68]
      to-[#3b1f69]
      text-white
      "
    >
      <Sidebar />

      <main
        className="
        flex-1
        overflow-y-auto
        p-8
        relative
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-400/20 rounded-full blur-[120px]" />

          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[150px]" />

          <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px]" />

        </div>

        <div className="relative z-10">
          {children}
        </div>

      </main>
    </div>
  );
}