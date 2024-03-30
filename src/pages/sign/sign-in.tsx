import { Box, Button, Container, Flex, HStack, Input, Link, Text, VStack } from "@chakra-ui/react";

export function SignIn() {
  return (
    <Box flex="1"
    backgroundColor={"black"}>
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
            <Link  color="blue" href="">
              Esqueceu a senha?
            </Link>
          </VStack>
          <Button width="full" color="white" backgroundColor="blue" colorScheme="purple">
            Entrar
          </Button>
            <Text color="white">
              Novo no Castfy? {' '}
              <Link color="blue" href="">
                Create an account
              </Link>
          </Text>

        </VStack>
      </Container>
    </Box>
  );
}
