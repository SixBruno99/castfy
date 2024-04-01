import { Container, Box, VStack, Input, Button } from "@chakra-ui/react";

export function SignUp() {
  return (
    <Box flex="1">
      <Container
        maxWidth="md"
        height="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <VStack width="full" spacing={3}>
          <Input type="email" placeholder="E-mail" />
          <Input type="password" placeholder="Senha" />
          <Button
            width="full"
            color="white"
            backgroundColor="#413C69"
            colorScheme="purple"
          >
            Entrar
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
