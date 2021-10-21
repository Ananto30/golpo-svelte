module.exports = {
  purge: {
    enabled: !process.env.ROLLUP_WATCH,
    content: ["./public/index.html", "./src/**/*.svelte"],
    options: {
      defaultExtractor: (content) => [
        ...(content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []),
        ...(content.match(/(?<=class:)[^=>\/\s]*/g) || []),
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      light1: "#dcddde",
      light2: "#e0b444",
      light3: "#40444b",
      dark1: "#36393f",
      dark2: "#292b2f",
      dark3 : "#202225",
      color1: "#4459e0",
      "color1-dark": "#374CD3",
      red: "#ed4245",
      green: "#3ba55d",
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
