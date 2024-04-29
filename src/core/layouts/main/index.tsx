import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navBar";
import { Footer } from "./components/footer";

export function MainLayout() {
  return (
    <>
      <Flex minHeight='100vh' width="full" direction={{ base: 'column', md: 'row' }}>
        <Box display={{ base: 'none', md: 'flex' }}>
          <NavBar selectedPage="Home" />
        </Box>
          <Outlet />
        <Box display={{ base: 'flex', md: 'none' }}>
          <Footer selectedPage="Home"/>
        </Box>
      </Flex>
    </>
  );
}
