import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            className="
            w-12
            h-12
            rounded-full
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            flex
            items-center
            justify-center
            text-white
            hover:scale-110
            transition
            "
        >

            {theme === "dark"
                ? <Sun size={22}/>
                : <Moon size={22}/>
            }

        </button>

    );

}