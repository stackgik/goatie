/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "poppins-semibold": ["Poppins-SemiBold", "san-serif"],
        "plus_jakarta_sans-regular": ["PlusJakartaSans-Regular", "sans-serif"],
      },
      colors: {
        "c-green": {
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
        },
        "c-red": {
          500: "#ef4444",
          600: "#dc2626",
          800: "#991b1b",
        },
        "c-blue": {
          500: "#3b82f6",
          600: "#2563eb",
          800: "#1e40af",
        },
        "c-yellow": {
          500: "#eab308",
          600: "#ca8a04",
        },
        "c-amber": {
          600: "#d97706",
          700: "#b45309",
        },
        "c-indigo": {
          500: "#a855f7",
          600: "#9333ea",
          800: "#6b21a8",
        },
        "c-orange": {
          600: "#ea580c",
        },
        "c-neutral": {
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
        },
      },
    },
  },
  plugins: [],
};
