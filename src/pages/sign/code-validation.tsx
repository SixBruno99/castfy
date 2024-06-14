import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  Container,
  Image,
  PinInput,
  PinInputField,
} from "@chakra-ui/react";

export function CodeValidate() {
  return (
    <Box flex="1" backgroundColor={"black"}>
      <Container
        maxWidth="md"
        height="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
        overflowY={"auto"}
      >
        <Image src="/Castfy.svg" />
        <VStack spacing={4} alignItems={"start"}>
          <Text color={"white"} fontSize="medium" align={"left"}>
            Por favor, digite o código que enviamos para o seu email:
          </Text>
          <HStack width="full" justifyContent="space-between">
            <PinInput>
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
            </PinInput>
          </HStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
            >
              Validar
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
