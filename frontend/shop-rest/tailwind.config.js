function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    } else {
      return `rgb(var(${variableName}))`;
    }
  };
}

module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "2100px",
      },
      zIndex: {
        "-1": "-1",
      },
      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
        heading: ["Open Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10px": "0.625rem",
      },
      colors: {
        light: withOpacity("--color-light"),
        dark: withOpacity("--color-dark"),
        accent: withOpacity("--color-accent"),
        "accent-hover": withOpacity("--color-accent-hover"),
        "accent-300": withOpacity("--color-accent-300"),
        "accent-400": withOpacity("--color-accent-400"),
        "accent-500": withOpacity("--color-accent-500"),
        "accent-600": withOpacity("--color-accent-600"),
        "accent-700": withOpacity("--color-accent-700"),
        "border-50": withOpacity("--color-border-50"),
        "border-100": withOpacity("--color-border-100"),
        "border-200": withOpacity("--color-border-200"),
        "border-base": withOpacity("--color-border-base"),
        "border-400": withOpacity("--color-border-400"),
        "gray-50": withOpacity("--color-gray-50"),
        "gray-100": withOpacity("--color-gray-100"),
        "gray-200": withOpacity("--color-gray-200"),
        "gray-300": withOpacity("--color-gray-300"),
        "gray-400": withOpacity("--color-gray-400"),
        "gray-500": withOpacity("--color-gray-500"),
        "gray-600": withOpacity("--color-gray-600"),
        "gray-700": withOpacity("--color-gray-700"),
        "gray-800": withOpacity("--color-gray-800"),
        "gray-900": withOpacity("--color-gray-900"),
        social: {
          facebook: "#3b5998",
          "facebook-hover": "#35508a",
          twitter: "#1da1f2",
          instagram: "#e1306c",
          youtube: "#ff0000",
          google: "#DB4437",
          "google-hover": "#cc3e30",
        },
      },
      textColor: {
        body: withOpacity("--text-base"),
        "body-dark": withOpacity("--text-base-dark"),
        muted: withOpacity("--text-muted"),
        "muted-light": withOpacity("--text-muted-light"),
        heading: withOpacity("--text-heading"),
        "sub-heading": withOpacity("--text-sub-heading"),
        bolder: withOpacity("--text-text-bolder"),
      },
      minHeight: {
        580: "580px",
        140: "35rem", // 560px
        40: "10rem", // 140px
        6: "2.5rem",
      },
      height: {
        4.5: "1.125rem",
        13: "3.125rem",
        22: "5.25rem",
        double: "200%",
      },
      maxHeight: {
        "70vh": "70vh",
        "85vh": "85vh",
        140: "35rem", // 560px
      },
      maxWidth: {
        1920: "1920px",
      },
      minWidth: {
        150: "150px",
      },
      borderRadius: {
        DEFAULT: "5px",
      },
      inset: {
        22: "5.25rem",
      },
      strokeWidth: {
        2.5: "2.5",
      },
      boxShadow: {
        200: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        300: "rgba(0, 0, 0, 0.16) 0px 0px 6px",
        350: "rgba(0, 0, 0, 0.16) 0px 3px 6px",
        400: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0",
        500: "rgba(0, 0, 0, 0.17) 0px 0px 12px",
        700: "rgba(0, 0, 0, 0.08) 0px 2px 16px",
        900: "rgba(0, 0, 0, 0.05) 0px 21px 36px",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
