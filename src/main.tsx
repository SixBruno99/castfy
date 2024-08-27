import "./index.css"
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "./routes";
import { AuthProvider } from "./contexts/auth";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
