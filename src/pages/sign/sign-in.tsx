import { Box, Button, Container, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function SignIn() {
  return (
    <Box flex="1" backgroundColor={"black"}>
      <Container
        maxWidth="md"
        height="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack width="full" spacing={5}>
          <Input type="email" placeholder="E-mail" background="white" />
          <VStack width="full" spacing={0} alignItems="end">
            <Input type="password" placeholder="Senha" background="white" />
            <Text color={"white"}>
              <Link to="/">
                Esqueceu a senha?
              </Link>
            </Text>
          </VStack>
          <HStack display={"flex"} width="full">
            <Button flex="1" color="white" backgroundColor="blue" colorScheme="blue">
              Login
            </Button>
            <Button flex="1" color="white" backgroundColor="blue" colorScheme="blue">
              <Link to="/signUp">Cadastre-se</Link>
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
