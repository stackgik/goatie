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
        "plus_jakarta_sans-medium": ["PlusJakartaSans-Medium", "sans-serif"],
        "plus_jakarta_sans-semibold": [
          "PlusJakartaSans-SemiBold",
          "sans-serif",
        ],
        "plus_jakarta_sans-bold": ["PlusJakartaSans-Bold", "sans-serif"],
      },
      colors: {
        "c-green": {
          100: "#f0fdf4",
          200: "#dcfce7",
          300: "#bbf7d0",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
        },
        "c-red": {
          300: "#fef2f2",
          400: "#fecaca",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
        },
        "c-blue": {
          100: "#f0f9ff",
          200: "#e0f2fe",
          300: "#bae6fd",
          400: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
        },
        "c-yellow": {
          400: "#fefce8",
          500: "#eab308",
          600: "#ca8a04",
          700: "#854d0e",
        },
        "c-amber": {
          600: "#d97706",
          700: "#b45309",
        },
        "c-indigo": {
          400: "#faf5ff",
          500: "#a855f7",
          600: "#9333ea",
          800: "#6b21a8",
        },
        "c-orange": {
          600: "#ea580c",
        },
        "c-neutral": {
          100: "#f8fafc",
          200: "#f3f4f6",
          300: "#f1f5f9",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
