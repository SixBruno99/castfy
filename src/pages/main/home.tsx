import { Text, Container, Box, VStack, StackDivider, Divider } from "@chakra-ui/react";

export function Home() {
  return (
    <Box backgroundColor="#1f1f1f" height={"100vh"} width={"calc(100vw - 150px)"} padding={50}>

        <VStack display={"initial"} >

          <Box height={150}>
            <VStack display={"initial"} spacing={0}>
              <Text fontSize="35px" fontWeight="bold" color={"white"}>
                Para você:
              </Text>
              <Divider orientation='horizontal'/>
            </VStack>
          </Box>

          <Box height={150}>
            <VStack display={"initial"} spacing={0}>
              <Text fontSize="35px" fontWeight="bold" color={"white"}>
                Recentemente Ouvidos:
              </Text>
              <Divider orientation='horizontal'/>
            </VStack>
          </Box>

          <Box height={150}>
            <VStack display={"initial"} spacing={0}>
              <Text fontSize="35px" fontWeight="bold" color={"white"}>
                Mais Escutados no Dia:
              </Text>
              <Divider orientation='horizontal'/>
            </VStack>
          </Box>

        </VStack>

    </Box>
  );
}
