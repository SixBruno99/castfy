import { Box, Button, Container, HStack, Input, Link, Text, VStack } from "@chakra-ui/react";

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
            <Link color="white" href="">
              Esqueceu a senha?
            </Link>
          </VStack>
          <HStack display={"flex"} width="full">
            <Button flex="1" color="white" backgroundColor="blue" colorScheme="blue">
              Login
            </Button>
            <Button flex="1" color="white" backgroundColor="blue" colorScheme="blue">
              Cadastre-se
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
