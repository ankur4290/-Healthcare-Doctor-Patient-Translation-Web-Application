import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
                }
            }
        },
    },
    plugins: [],
};
export default config;
