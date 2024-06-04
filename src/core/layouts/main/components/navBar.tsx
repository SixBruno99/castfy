import { Box, VStack, Image, Button, Icon, Text } from "@chakra-ui/react";
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

export function NavBar(props: NavBarProps) {
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
      width="150px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="black"
      borderRight="1px solid #383838"
    >
      <VStack>
        <Image src="/Castfy.svg" width={150} />

        <VStack marginTop={4}>
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
              as={MdHomeFilled}
              h={6}
              w={6}
              color={selectedPage === "Home" ? "black" : "white"}
            />
          </Button>
          <Text color={"white"}>Início</Text>

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
            />
          </Button>
          <Text color={"white"}>Pesquisar</Text>
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
            />
          </Button>
          <Text color={"white"}>Biblioteca</Text>
        </VStack>
      </VStack>

      <VStack marginBottom={4}>
        <Button
          borderRadius={"24px"}
          colorScheme="gray"
          width={"100px"}
          height={"45px"}
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
    </Box>
  );
}
