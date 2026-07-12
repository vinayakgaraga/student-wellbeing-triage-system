export default function GlassButton({
    children,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={`
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            shadow-lg
            transition-all
            ${className}
            `}
        >
            {children}
        </button>
    );
}