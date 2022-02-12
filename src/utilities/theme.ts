import { PaletteMode } from "@mui/material";
import { red, grey, blueGrey, green } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // palette values for light mode
          primary: {
            main: green[400],
          },
          secondary: {
            main: grey[400],
          },
          danger: {
            main: red[400],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: blueGrey,
          danger: {
            main: red[400],
          },
          // background: {
          // default: deepOrange[900],
          // paper: deepOrange[900],
          // },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h2: {
      fontSize: "2rem",
      fontWeight: "400",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "1rem",
          fontSize: "1rem",
        },
      },
    },
    MuiSlide: {
      defaultProps: {
        direction: "left",
      },
    },
  },
});

export default getDesignTokens;
