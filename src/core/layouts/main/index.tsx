import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./components/navBar";

export function MainLayout() {
  return (
    <Flex minHeight="100vh" width="full">
      <NavBar selectedPage="Home" />
      <Outlet />
    </Flex>
  );
}
