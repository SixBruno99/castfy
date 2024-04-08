import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  VStack,
  Image
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";

export function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSignIn = () => {
    // Validate email and password
    if (!email || !password) {
      if (!email) {
        setErrorEmail("E-mail inválido.");
      } else {
        setErrorEmail("");
      }

      if(!password) {
        setErrorPassword("Senha inválida.");
      } else {
        setErrorPassword("");
      }

      return;
    }

    // Retira o erro da tela quando os campos estiverem preenchidos
    setErrorEmail("");
    setErrorPassword("");

    // Cria o payload com o email e o password
    signIn({email: email, password: password}, true);
  };

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

        <Image src="/Castfy_DarkMode.svg"/>
        <VStack width="full" spacing={5}>
          <VStack width={"full"} spacing={1} alignItems="start">
            <Input type="email" placeholder="E-mail" background="white" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errorEmail && <Text color="red" fontSize={12}>{errorEmail}</Text>}
          </VStack>
          <VStack width={"full"} spacing={0} alignItems="end">
            <VStack width={"full"} spacing={1} alignItems="start">
              <Input type="password" placeholder="Senha" background="white" value={password} onChange={(e) => setPassword(e.target.value)}/>
              {errorPassword && <Text color="red" fontSize={12}>{errorPassword}</Text>}
            </VStack>
            <Text color={"white"}>
              <Link to="/">Esqueceu a senha?</Link>
            </Text>
          </VStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
              onClick={handleSignIn}
            >
              Login
            </Button>
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
            >
              <Link to="/signUp">Cadastre-se</Link>
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
