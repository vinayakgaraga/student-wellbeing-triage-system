export default function GlassCard({ children, className = "" }) {
    return (
        <div
            className={`
                relative
                overflow-hidden
                rounded-3xl
                bg-white/10
                backdrop-blur-3xl
                border
                border-white/20
                shadow-[0_8px_32px_rgba(0,0,0,.25)]
                p-8
                min-h-[220px]
                ${className}
            `}
        >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative h-full">
                {children}
            </div>
        </div>
    );
}