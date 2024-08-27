import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Text,
  VStack,
  Image,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function ForgotPassword() {
  const { sendEmail } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleSendEmail = async () => {
    try {
      const response = await sendEmail(email);

      if (response) {
        navigate("/codeValidation");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar e-mail",
        description: `Ocorreu um erro ao tentar enviar o e-mail`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
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
          <VStack width={"full"} spacing={5} alignItems="start">
            <Text color={"white"} fontSize="lg" noOfLines={5} align={"justify"}>
              Por favor, insira o endereço de e-mail associado à sua conta
              abaixo e nós enviaremos instruções sobre como redefinir sua senha.
            </Text>
            <Input
              type="email"
              placeholder="E-mail"
              background="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </VStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
            >
              <Link to="/">Voltar</Link>
            </Button>
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
              onClick={handleSendEmail}
            >
              Enviar E-mail
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
