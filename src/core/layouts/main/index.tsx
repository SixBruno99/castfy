import { Box,  HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navBar";

export function MainLayout() {

  return (
    <Box width="full" height="100vh">
        <HStack width="full" height="100vh" spacing={0}>
          <NavBar selectedPage="Home"/>
          <Outlet />
        </HStack>
    </Box>
  );
}
