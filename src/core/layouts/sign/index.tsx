import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function SignLayout() {
  return (
    <Box width="full" overflowY={"scroll"}>
      <Flex width="full" height="100vh">
        <Outlet />
      </Flex>
    </Box>
  );
}
