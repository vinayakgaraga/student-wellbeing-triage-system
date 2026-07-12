export default function GlassInput(props) {
    return (
        <input
            {...props}
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-white
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            text-slate-700
            placeholder:text-slate-400
            "
        />
    );
}