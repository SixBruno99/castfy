import { 
  Container, 
  Box, 
  VStack, 
  Input, 
  Button, 
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  Image
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/auth";
import { useState } from "react";
import { EGender } from "../../types/auth";

export function SignUp() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => {

    if (!email || !password || !usuario || !dataNascimento || !password || !confirmPassword) {
      setError("Algum campo está vazio.");
      return;
    }
    signUp({name: usuario, email: email, password: password, gender: EGender.NON_BINARY, birthDate: new Date(dataNascimento)});
  }


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

        <Image src="/Castfy_DarkMode.svg" width={250}/>

        <VStack width="full" spacing={3} marginInline={10} overflowY={"auto"}>
      
          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Email</FormLabel>
            <Input type="email" placeholder="E-mail" background={"white"} value={email} onChange={(e) => setEmail(e.target.value)}/>
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Usuário</FormLabel>
            <Input type="text" placeholder="Usuário" background={"white"} value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Data de Nascimento</FormLabel>
            <Input type="date" placeholder="Data de Nascimento" background={"white"} value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)}/>
          </FormControl>

          <FormControl >
            <FormLabel color={"white"} fontSize={14}>Senha</FormLabel>
            <Input type="password" placeholder="Senha" background={"white"} value={password} onChange={(e) => setPassword(e.target.value)}/>
          </FormControl>

          <FormControl>
            <FormLabel color={"white"} fontSize={14}>Confirmar Senha</FormLabel>
            <Input type="password" placeholder="Confirmar Senha" background={"white"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </FormControl>

          <Button
          type="submit"
            marginTop={5}
            width="full"
            color="white"
            backgroundColor="#004aad"
            colorScheme="#004aad"
            onClick={handleSignUp}
          >
            Cadastre-se
          </Button>
          {error && <Text color="red" fontSize={12}>{error}</Text>}
        </VStack>
      </Container>
    </Box>
  );
}
