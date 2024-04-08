import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export function MainLayout() {

  return (
    <Box>
      <Header />
      <Flex width="full" height="100vh">
        <Outlet />
      </Flex>
      <Footer />
    </Box>
  );
}
