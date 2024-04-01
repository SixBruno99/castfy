import { ChakraProvider } from "@chakra-ui/react";
import { Routes } from "./routes";
import ReactDOM from "react-dom/client";
import React from "react";
import { AuthProvider } from "./contexts/auth";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
