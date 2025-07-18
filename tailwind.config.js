module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        progress: "progressAnim 5s linear forwards",
      },
      keyframes: {
        progressAnim: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
    },
  },
};
