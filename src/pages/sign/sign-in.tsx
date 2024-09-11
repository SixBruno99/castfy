import {
  Box,
  Container,
  Image,
  VStack,
  Input,
  Text,
  HStack,
  Button,
  CircularProgress,
  useToast,
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
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignIn = async () => {
    // Validate email and password
    if (!email || !password) {
      if (!email) {
        setErrorEmail("E-mail inválido.");
        return;
      } else {
        setErrorEmail("");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Verifica se o email corresponde ao formato esperado
      if (!emailRegex.test(email)) {
        setErrorEmail("Formato de email inválido.");
        return;
      }

      const passwordRegex =
        /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!password || password.length < 8 || !passwordRegex.test(password)) {
        setErrorPassword("Senha inválida.");
        return;
      } else {
        setErrorPassword("");
      }

      // Retorna a variável de erro do email para o estado default
      setErrorEmail("");
      return;
    }

    // Retira o erro da tela quando os campos estiverem preenchidos
    setErrorEmail("");
    setErrorPassword("");

    // Define o estado de carregamento como verdadeiro
    setIsLoading(true);

    try {
      // Cria o payload com o email e o password e chama a função signIn
      await signIn({ email, password }, true);
    } catch (error) {
      // Handle sign-in error here
      // Exibe a mensagem de erro usando o Toast
      toast({
        title: "Erro de autenticação. Credenciais inválidas.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      console.error(error);
    } finally {
      // Define o estado de carregamento como falso após a tentativa de login
      setIsLoading(false);
    }
  };

  return (
    <Box flex="1" height={"100vh"} backgroundColor={"black"}>
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
        <VStack width="full" spacing={5}>
          <VStack width={"full"} spacing={1} alignItems="start">
            <Input
              type="email"
              placeholder="E-mail"
              background="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errorEmail && (
              <Text color="red" fontSize={12}>
                {errorEmail}
              </Text>
            )}
          </VStack>
          <VStack width={"full"} spacing={0} alignItems="end">
            <VStack width={"full"} spacing={1} alignItems="start">
              <Input
                type="password"
                placeholder="Senha"
                background="white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorPassword && (
                <Text color="red" fontSize={12}>
                  {errorPassword}
                </Text>
              )}
            </VStack>
            <Text color={"white"}>
              <Link to="/forgotPassword">Esqueceu a senha?</Link>
            </Text>
          </VStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
              onClick={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress isIndeterminate size="24px" /> : "Login"}
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
