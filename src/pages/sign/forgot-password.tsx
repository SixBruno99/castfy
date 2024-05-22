import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
import {
    Box,
    Button,
    Container,
    HStack,
    Input,
    Text,
    VStack,
    Image,
    Stack,
  } from "@chakra-ui/react";

export function ForgotPassword() {

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
            <Text color={"white"} fontSize='lg' noOfLines={5} align={"justify"}>
                Por favor, insira o endereço de e-mail associado à sua conta abaixo e nós enviaremos instruções sobre como redefinir sua senha.
            </Text>
            <Input
              type="email"
              placeholder="E-mail"
              background="white"
              

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
            >
                Enviar E-mail
            </Button>
          </HStack>
    
        </VStack>
      </Container>
    </Box>
    );
}