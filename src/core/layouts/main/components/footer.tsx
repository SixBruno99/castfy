import {
  Box,
  VStack,
  Button,
  Icon,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { MdAccountCircle, MdSearch, MdOutlineFolder } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface NavBarProps {
  selectedPage: string;
  onNavigate: (page: string) => void;
}

export function Footer(props: NavBarProps) {
  const { selectedPage, onNavigate } = props;
  const navigate = useNavigate();

  const handleListenClick = () => {
    onNavigate("Home");
    navigate(`/`);
  };

  const handleSearchClick = () => {
    onNavigate("Search");
    navigate(`/`);
    // navigate(`/search`);
  };

  const handleLibraryClick = () => {
    onNavigate("Library");
    navigate(`/library`);
  };

  return (
    <Box
      width="full"
      height="100px"
      backgroundColor={"black"}
      borderTop="1px solid #383838"
      padding={15}
    >
      <Flex alignItems="center" justifyContent="center">
        <HStack>
          <VStack spacing={0}>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"100px"}
              height={"45px"}
              bg={selectedPage === "Home" ? "#ffffff" : "transparent"}
              color={selectedPage === "Home" ? "black" : "white"}
              onClick={handleListenClick}
            >
              <Icon
                as={MdAccountCircle}
                h={6}
                w={6}
                color={selectedPage === "Home" ? "black" : "white"}
              />
            </Button>
            <Text color={"white"}>Início</Text>
          </VStack>

          <VStack spacing={0}>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"100px"}
              height={"45px"}
              bg={selectedPage === "Search" ? "#ffffff" : "transparent"}
              color={selectedPage === "Search" ? "black" : "white"}
              onClick={handleSearchClick}
            >
              <Icon
                as={MdSearch}
                h={6}
                w={6}
                color={selectedPage === "Search" ? "black" : "white"}
              ></Icon>
            </Button>
            <Text color={"white"}>Pesquisar</Text>
          </VStack>

          <VStack spacing={0}>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"100px"}
              height={"45px"}
              bg={selectedPage === "Library" ? "#ffffff" : "transparent"}
              color={selectedPage === "Library" ? "black" : "white"}
              onClick={handleLibraryClick}
            >
              <Icon
                as={MdOutlineFolder}
                h={6}
                w={6}
                color={selectedPage === "Library" ? "black" : "white"}
              ></Icon>
            </Button>
            <Text color={"white"}>Biblioteca</Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}