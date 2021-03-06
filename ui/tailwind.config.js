module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        2: "18rem 1fr",
        maxfr: "max-content 1fr",
        half: "50% 50%",
      },
      height: {
        "90vh": "90vh",
        "2px": "2px",
        "95vh": "95vh",
        "40rem": "40rem",
        "90%": "90%",
        "93%": "93%",
      },
      width: {
        "30rem": "30rem",
        maxcontent: "max-content",
      },
      colors: {
        backdrop: "#000000b0",
        primaryColor: "red",
        secondaryColor: "white",
        lpPrimaryColor: "#2d33fd",
      },
      boxShadow: {
        boxshadow: "0 0 2px 1px grey",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
