export default function PageHeader({
    title,
    subtitle,
    buttonText,
    onClick,
}) {
    return (
        <div className="flex justify-between items-center mb-8">

            <div>
                <h1 className="text-5xl font-bold text-white">
                    {title}
                </h1>

                <p className="text-white/70 mt-2 text-lg">
                    {subtitle}
                </p>
            </div>

            {buttonText && (
                <button
                    onClick={onClick}
                    className="
                        px-6
                        py-3
                        rounded-2xl
                        bg-gradient-to-r
                        from-cyan-500
                        to-blue-600
                        hover:from-cyan-400
                        hover:to-blue-500
                        text-white
                        font-semibold
                        shadow-xl
                        transition
                        duration-300
                    "
                >
                    {buttonText}
                </button>
            )}

        </div>
    );
}