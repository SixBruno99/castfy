import { Box, VStack, Image, Button, Icon, Text } from "@chakra-ui/react";
import { MdAccountCircle, MdSearch, MdOutlineFolder } from 'react-icons/md'

interface NavBarProps {
  selectedPage: string;
}

export function NavBar(props: NavBarProps) {

  const { selectedPage } = props;

  return (
    <Box width={"150px"} height="100vh" alignItems="center" justifyContent="center" backgroundColor={"black"}  borderRight="1px solid #383838">
      <VStack spacing={5}>

      <VStack spacing={0}>
          <Image src="/Castfy.svg" width={150} />
          <Button borderRadius={"24px"} colorScheme='gray' width={"100px"} height={"45px"} bg={selectedPage==="Home" ? "#ffffff" : "transparent"} color={selectedPage==="Home" ? "black" : "white"}>
            <Icon as={MdAccountCircle} h={6} w={6} color={selectedPage==="Home" ? "black" : "white"} />
          </Button>
          <Text color={"white"}>
            Início
          </Text>
        </VStack>

        <VStack spacing={0}>
          <Button  borderRadius={"24px"} colorScheme='gray' width={"100px"} height={"45px"} bg={selectedPage==="Search" ? "#ffffff" : "transparent"} color={selectedPage==="Search" ? "black" : "white"}>
            <Icon as={MdSearch} h={6} w={6} color={selectedPage==="Search" ? "black" : "white"}>
            </Icon>
          </Button>
          <Text color={"white"}>
            Pesquisar
          </Text>
        </VStack>

        <VStack spacing={0}>
          <Button  borderRadius={"24px"} colorScheme='gray' width={"100px"} height={"45px"} bg={selectedPage==="Library" ? "#ffffff" : "transparent"} color={selectedPage==="Library" ? "black" : "white"}>
            <Icon as={MdOutlineFolder} h={6} w={6} color={selectedPage==="Library" ? "black" : "white"}>
            </Icon>
          </Button>
          <Text color={"white"}>
            Biblioteca
          </Text>
        </VStack>

      </VStack>
    </Box>
  );
}
