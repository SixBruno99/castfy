import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function SignLayout() {
  return (
    <Box width="full">
      <Header />
      <Flex width="full" height="calc(100vh - 112px)">
        <Outlet />
      </Flex>
      <Footer />
    </Box>
  );
}
