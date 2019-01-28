const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer'),
    //Only add purgecss in production
    process.env.NODE_ENV === "production"? require("@fullhuman/postcss-purgecss")({
      content: [
        "./src/**/*.html",
        "./src/**/*.vue"
      ]
    }): ""
  ]
}
