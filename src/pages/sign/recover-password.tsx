import { useState } from "react";
import {
    Box,
    Button,
    Container,
    HStack,
    Input,
    VStack,
    Image,
    FormControl,
    FormLabel,
    FormErrorMessage,
  } from "@chakra-ui/react";

export function RecoverPassword() {

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [errorPassword, setErrorPassword] = useState({
    error: false,
    textoError: "",
  });
const [errorConfirmPassword, setErrorConfirmPassword] = useState({
  error: false,
  textoError: "",
});

const validatePassword = () => {
    // Verifica se a senha está vazia
    if (!password) {
      setErrorPassword({ error: true, textoError: "Senha inválida." });
      return false;
    }

    if (password.length < 8) {
      setErrorPassword({
        error: true,
        textoError: "Senha deve conter no mínimo 8 caracteres.",
      });
      return false;
    }

    // Expressão regular para verificar a presença de pelo menos um caractere especial, uma letra maiúscula e um número
    const passwordRegex =
      /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Verifica se a senha atende aos critérios de segurança
    if (!passwordRegex.test(password)) {
      setErrorPassword({
        error: true,
        textoError:
          "Senha inválida. Deve conter pelo menos um caractere especial, uma letra maiúscula e um número.",
      });
      return false;
    }

    // Verifica se a "senha" é igual a "confirmar senha"
    if (password !== confirmPassword) {
      setErrorPassword({ error: true, textoError: "As senhas não coincidem." });
      return false;
    }

    // Retorna a variável de erro da senha para o estado default
    setErrorPassword({ error: false, textoError: "" });
    return true;
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
        <Image src="/Castfy.svg" />
        <VStack width="full" spacing={5}>
          <VStack width={"full"} spacing={5} alignItems="start">
          <FormControl isInvalid={errorPassword.error}>
            <FormLabel color="white" fontSize={14}>
              Senha
            </FormLabel>
            <Input
              type="password"
              placeholder="Senha"
              background="white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage color="red" fontSize={12}>
              {errorPassword.textoError}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errorConfirmPassword.error}>
            <FormLabel color="white" fontSize={14}>
              Confirmar Senha
            </FormLabel>
            <Input
              type="password"
              placeholder="Confirmar Senha"
              background="white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormErrorMessage color="red" fontSize={12}>
              {errorConfirmPassword.textoError}
            </FormErrorMessage>
          </FormControl>
          </VStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
              onClick={validatePassword}
            >
                Redefinir Senha
            </Button>
          </HStack>
    
        </VStack>
      </Container>
    </Box>
    );
}