/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  atDirectives:[{
    "name": "@apply",
    "description": "Use the `@apply` directive to inline any existing utility classes into your own custom CSS. This is useful when you find a common utility pattern in your HTML that you’d like to extract to a new component.",
    "references": [
      {
        "name": "Tailwind Documentation",
        "url": "https://tailwindcss.com/docs/functions-and-directives#apply"
      }
    ]
  }],
  theme: {
    extend: {
      colors: {
        whitesmoke: "#f3f4f6",
        white: "#fff",
        blueviolet: "#9333ea",
        darkorchid: "#ba59ff",
        gray: {
          "100": "#1f2937",
          "200": "#111827",
        },
        darkslategray: "#374151",
        darkgray: {
          "100": "#b2b2b2",
          "200": "#9ca3af",
        },
        mediumspringgreen: "#22c55e",
        forestgreen: "#08ab45",
        black: "#000",
        dodgerblue: "#3b82f6",
        cornflowerblue: "#549cff",
        slategray: "#6b7280",
        mediumslateblue: "#6366f1",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
      },
    },
    fontSize: {
      base: "1rem",
      inherit: "inherit",
    },
    screens: {
      mq600: {
        raw: "screen and (max-width: 600px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
