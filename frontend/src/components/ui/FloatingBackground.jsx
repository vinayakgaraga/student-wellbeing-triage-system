export default function FloatingBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden">

            <div className="absolute inset-0 bg-[#050816]" />

            <div className="absolute -left-40 top-10 w-[450px] h-[450px] bg-cyan-500 rounded-full blur-[180px] opacity-20"></div>

            <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-indigo-500 rounded-full blur-[180px] opacity-20"></div>

            <div className="absolute bottom-0 left-1/2 w-[450px] h-[450px] bg-purple-500 rounded-full blur-[180px] opacity-20"></div>

        </div>
    );
}