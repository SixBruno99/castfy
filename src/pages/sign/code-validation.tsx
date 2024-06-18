import {
  Box,
  Container,
  VStack,
  Text,
  HStack,
  Button,
  PinInput,
  PinInputField,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

export function CodeValidate() {
  const { sendCode } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [code, setCode] = useState("");

  const handleSendCode = async () => {
    try {
      const response = await sendCode(code);

      if (response) {
        navigate("/recoverPassword");
      } else {
        throw new Error("Failed to send email");
      }
    } catch (error) {
      toast({
        title: "Erro ao enviar código",
        description: `Ocorreu um erro ao tentar enviar o código`,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const handleChangeCode = (value: string) => {
    setCode(value);
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
        <VStack spacing={4} alignItems={"start"}>
          <Text color={"white"} fontSize="medium" align={"left"}>
            Por favor, digite o código que enviamos para o seu email:
          </Text>
          <HStack width="full" justifyContent="space-between">
            <PinInput onChange={handleChangeCode}>
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
              <PinInputField color="white" />
            </PinInput>
          </HStack>
          <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
              onClick={handleSendCode}
            >
              Validar
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}
