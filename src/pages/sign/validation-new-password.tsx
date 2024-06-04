import React, { useState } from 'react';
import { Box, Button, HStack, Input, Text, VStack,
  Container,
  Image,
  FormControl,
  FormLabel,
  FormErrorMessage, } from '@chakra-ui/react';

export function ValidationNewPassword() {

  const [code, setCode] = useState(new Array(6).fill(''));

  const handleSubmit = () => {
    alert(`Code entered: ${code.join('')}`);
    // Add logic to handle code submission
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
        <Text color={"white"} fontSize='medium' align={"left"}>Por favor, digite o código que enviamos para o seu email:</Text>
        <HStack spacing={2}>
          {code.map((_, index) => (
            <Input
              key={index}
              id={`code-${index}`}
              value={code[index]}
              maxLength={1}
              textAlign="center"
              type="text"
              size="lg"
            />
          ))}
        </HStack>
        <HStack display={"flex"} width="full">
            <Button
              flex="1"
              color="white"
              backgroundColor="#004aad"
              colorScheme="#004aad"
            >
                Validar
            </Button>
          </HStack>
      </VStack>
      </Container>
    </Box>
    );
}