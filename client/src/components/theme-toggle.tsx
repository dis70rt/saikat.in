import { FaMoon, FaSun } from 'react-icons/fa';
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="glass-card p-3 hover:scale-110 transition-all duration-300 group"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaMoon size={20} className="text-secondary-color group-hover:text-accent-primary transition-colors" />
      ) : (
        <FaSun size={20} className="text-secondary-color group-hover:text-accent-primary transition-colors" />
      )}
    </button>
  );
}