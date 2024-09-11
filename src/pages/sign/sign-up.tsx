import {
  Container,
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
import { EGender } from "../../types/auth";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState({
    error: false,
    textoError: "",
  });
  const [errorNome, setErrorNome] = useState({ error: false, textoError: "" });
  const [errorDataNascimento, setErrorDataNascimento] = useState({
    error: false,
    textoError: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    error: false,
    textoError: "",
  });
  const [errorConfirmPassword, setErrorConfirmPassword] = useState({
    error: false,
    textoError: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Função de validação do email
  const validateEmail = () => {
    // Verifica se o email está vazio
    if (!email) {
      setErrorEmail({ error: true, textoError: "Email inválido." });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Verifica se o email corresponde ao formato esperado
    if (!emailRegex.test(email)) {
      setErrorEmail({ error: true, textoError: "Formato de email inválido." });
      return false;
    }

    // Retorna a variável de erro do email para o estado default
    setErrorEmail({ error: false, textoError: "" });
    return true;
  };

  // Função de validação do nome
  const validateNome = () => {
    // Verifica se o nome está vazio
    if (!nome) {
      setErrorNome({ error: true, textoError: "Nome inválido." });
      return false;
    }

    // Expressão regular para validar se o nome contém apenas letras e espaços
    const nomeRegex = /^[a-zA-ZÀ-ú\s]*$/;

    // Verifica se o nome contém apenas letras e espaços
    if (!nomeRegex.test(nome)) {
      setErrorNome({
        error: true,
        textoError: "Nome inválido. Use apenas letras e espaços.",
      });
      return false;
    }

    // Retorna a variável de erro do nome para o estado default
    setErrorNome({ error: false, textoError: "" });
    return true;
  };

  // Função de validação da data de nascimento
  const validateDataNascimento = () => {
    // Verifica se a data de nascimento está vazia
    if (!dataNascimento) {
      setErrorDataNascimento({ error: true, textoError: "Data inválida." });
      return false;
    }

    // Retorna a variável de erro da data de nascimento para o estado default
    setErrorDataNascimento({ error: false, textoError: "" });
    return true;
  };

  // Função de validação da senha
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
          "Senha inválida. Deve conter pelo menos um caractere especial, uma letra maiúscula e um digito numérico.",
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

  // Função de validação da confirmação da senha
  const validateConfirmPassword = () => {
    // Verifica se a confirmação de senha está vazia
    if (!confirmPassword) {
      setErrorConfirmPassword({ error: true, textoError: "Senha inválida." });
      return false;
    }

    // Verifica se a "senha" é igual a "confirmar senha"
    if (password !== confirmPassword) {
      setErrorConfirmPassword({
        error: true,
        textoError: "As senhas não coincidem.",
      });
      return false;
    }

    // Retorna a variável de erro da "confirmar senha" para o estado default
    setErrorConfirmPassword({ error: false, textoError: "" });
    return true;
  };

  // Função de validação de SignUp
  const handleSignUp = async () => {
    const validacaoEmail = validateEmail();
    const validacaoNome = validateNome();
    const validacaoDataNascimento = validateDataNascimento();
    const validacaoPassword = validatePassword();
    const validacaoConfirmPassword = validateConfirmPassword();

    if (
      validacaoEmail &&
      validacaoNome &&
      validacaoDataNascimento &&
      validacaoPassword &&
      validacaoConfirmPassword
    ) {
      setIsLoading(true);
      try {
        await signUp({
          name: nome,
          email: email,
          password: password,
          gender: EGender.MALE,
          birthDate: new Date(dataNascimento),
        });
        navigate("/");
      } catch (error) {
        toast({
          title: "Erro no cadastro. Espere um pouco e tente novamente.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box flex="1" height={"100vh"} backgroundColor="black">
      <Container
        maxWidth="md"
        height="full"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/Castfy.svg" width={200} />

        <VStack width="full" spacing={3} paddingInline={25} overflowY="auto">
          <FormControl isInvalid={errorEmail.error}>
            <FormLabel color="white" fontSize={14}>
              Email
            </FormLabel>
            <Input
              type="email"
              placeholder="E-mail"
              background="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage color="red" fontSize={12}>
              {errorEmail.textoError}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errorNome.error}>
            <FormLabel color="white" fontSize={14}>
              Nome
            </FormLabel>
            <Input
              type="text"
              placeholder="Nome"
              background="white"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <FormErrorMessage color="red" fontSize={12}>
              {errorNome.textoError}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errorDataNascimento.error}>
            <FormLabel color="white" fontSize={14}>
              Data de Nascimento
            </FormLabel>
            <Input
              type="date"
              placeholder="Data de Nascimento"
              background="white"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
            />
            <FormErrorMessage color="red" fontSize={12}>
              {errorDataNascimento.textoError}
            </FormErrorMessage>
          </FormControl>

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

          <Button
            type="submit"
            minH={45}
            marginY={5}
            width="full"
            color="white"
            backgroundColor="#004aad"
            colorScheme="#004aad"
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress isIndeterminate color="white" size="24px" />
            ) : (
              "Cadastre-se"
            )}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
