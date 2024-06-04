import {
  Box,
  VStack,
  Button,
  Icon,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdSearch,
  MdOutlineFolder,
} from "react-icons/md";
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

  const handleProfileClick = () => {
    onNavigate("Profile");
    navigate(`/profile`);
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
        <HStack gap={4}>
          <VStack>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"64px"}
              height={"40px"}
              bg={selectedPage === "Home" ? "#ffffff" : "transparent"}
              color={selectedPage === "Home" ? "black" : "white"}
              onClick={handleListenClick}
            >
              <Icon
                as={MdHomeFilled}
                h={6}
                w={6}
                color={selectedPage === "Home" ? "black" : "white"}
              />
            </Button>
            <Text color={"white"}>Início</Text>
          </VStack>

          <VStack>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"76px"}
              height={"40px"}
              bg={selectedPage === "Search" ? "#ffffff" : "transparent"}
              color={selectedPage === "Search" ? "black" : "white"}
              onClick={handleSearchClick}
            >
              <Icon
                as={MdSearch}
                h={6}
                w={6}
                color={selectedPage === "Search" ? "black" : "white"}
              />
            </Button>
            <Text color={"white"}>Pesquisar</Text>
          </VStack>

          <VStack>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"76px"}
              height={"40px"}
              bg={selectedPage === "Library" ? "#ffffff" : "transparent"}
              color={selectedPage === "Library" ? "black" : "white"}
              onClick={handleLibraryClick}
            >
              <Icon
                as={MdOutlineFolder}
                h={6}
                w={6}
                color={selectedPage === "Library" ? "black" : "white"}
              />
            </Button>
            <Text color={"white"}>Biblioteca</Text>
          </VStack>

          <VStack>
            <Button
              borderRadius={"24px"}
              colorScheme="gray"
              width={"76px"}
              height={"40px"}
              bg={selectedPage === "Profile" ? "#ffffff" : "transparent"}
              color={selectedPage === "Profile" ? "black" : "white"}
              onClick={handleProfileClick}
            >
              <Icon
                as={MdAccountCircle}
                h={6}
                w={6}
                color={selectedPage === "Profile" ? "black" : "white"}
              />
            </Button>
            <Text color={"white"}>Perfil</Text>
          </VStack>
        </HStack>
      </Flex>
    </Box>
  );
}
