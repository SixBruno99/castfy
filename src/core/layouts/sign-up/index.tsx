import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/footer";

export function SignLayout() {
  return (
    <Box width="full">
      <Flex width="full" height="calc(100vh - 56px)">
        <Outlet />
      </Flex>
      <Footer />
    </Box>
  );
}
