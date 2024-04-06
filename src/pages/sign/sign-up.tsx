import { Container, Box, VStack, Input, Button, FormControl,
  FormLabel, Image} from "@chakra-ui/react";

export function SignUp() {
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

        <Image src="/Castfy_DarkMode.svg" width={300}/>

        <VStack width="full" spacing={3} marginInline={10} overflowY={"auto"}>
      
          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Email</FormLabel>
            <Input type="email" placeholder="E-mail" background={"white"} />
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Usuário</FormLabel>
            <Input type="text" placeholder="Usuário" background={"white"}/>
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Data de Nascimento</FormLabel>
            <Input type="date" placeholder="Data de Nascimento" background={"white"} />
          </FormControl>

          <FormControl >
            <FormLabel color={"white"} fontSize={14}>Senha</FormLabel>
            <Input type="password" placeholder="Senha" background={"white"} />
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Confirmar Senha</FormLabel>
            <Input type="password" placeholder="Confirmar Senha" background={"white"} />
          </FormControl>

          <Button
          type="submit"
            marginTop={5}
            width="full"
            color="white"
            backgroundColor="blue"
            colorScheme="blue"
          >
            Cadastre-se
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
