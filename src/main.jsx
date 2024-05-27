import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

const fonts={
  body:'poppins'
}

const theme = extendTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
