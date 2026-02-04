/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                doctor: {
                    primary: "#2563eb",
                    secondary: "#dbeafe",
                },
                patient: {
                    primary: "#059669",
                    secondary: "#d1fae5",
                },
            },
        },
    },
    plugins: [],
}
