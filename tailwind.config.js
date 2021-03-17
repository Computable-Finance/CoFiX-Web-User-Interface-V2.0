
module.exports = {
  purge: {
    enabled: true,
    content: ["./src/**/*.html", "./src/**/*.ts"]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       width: {
         '9/20': '45%',
         '4.5':'1.125rem'
       }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
