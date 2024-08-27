import { Flex, Image, Button, Text } from "@chakra-ui/react";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdSearch,
  MdOutlineFolder,
} from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/auth";

interface NavBarProps {
  selectedPage: string;
  onNavigate: (page: string) => void;
}

export function NavBar(props: NavBarProps) {
  const { signOut } = useAuth();
  const { selectedPage, onNavigate } = props;
  const navigate = useNavigate();

  const handleListenClick = () => {
    onNavigate("Home");
    navigate(`/`);
  };

  const handleSearchClick = () => {
    onNavigate("Search");
    navigate(`/search`);
  };

  const handleLibraryClick = () => {
    onNavigate("Library");
    navigate(`/library`);
  };

  const handleProfileClick = () => {
    onNavigate("Profile");
    navigate(`/profile`);
  };

  const handleSignOut = () => {
    signOut();
    navigate(`/`);
  };

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      backgroundColor="black"
      borderRight="1px solid #383838"
    >
      <Flex flexDirection="column" alignItems="center" gap={4}>
        <Image src="/Castfy.svg" width="96px" />

        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Button
            borderRadius="24px"
            colorScheme="gray"
            bg={selectedPage === "Home" ? "#ffffff" : "transparent"}
            color={selectedPage === "Home" ? "black" : "white"}
            onClick={handleListenClick}
          >
            <MdHomeFilled
              size="24px"
              color={selectedPage === "Home" ? "black" : "white"}
            />
          </Button>
          <Text color="white" fontWeight="semibold" fontSize="12px">
            Início
          </Text>
        </Flex>

        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Button
            borderRadius="24px"
            colorScheme="gray"
            bg={selectedPage === "Search" ? "#ffffff" : "transparent"}
            color={selectedPage === "Search" ? "black" : "white"}
            onClick={handleSearchClick}
          >
            <MdSearch
              size="24px"
              color={selectedPage === "Search" ? "black" : "white"}
            />
          </Button>
          <Text color="white" fontWeight="semibold" fontSize="12px">
            Pesquisar
          </Text>
        </Flex>

        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Button
            borderRadius="24px"
            colorScheme="gray"
            bg={selectedPage === "Library" ? "#ffffff" : "transparent"}
            color={selectedPage === "Library" ? "black" : "white"}
            onClick={handleLibraryClick}
          >
            <MdOutlineFolder
              size="24px"
              color={selectedPage === "Library" ? "black" : "white"}
            />
          </Button>
          <Text color="white" fontWeight="semibold" fontSize="12px">
            Biblioteca
          </Text>
        </Flex>
      </Flex>

      <Flex flexDirection="column" marginBottom={4} gap={4}>
        <Flex justifyContent="center" gap={2}>
          <Button
            borderRadius="24px"
            colorScheme="gray"
            bg={"transparent"}
            onClick={handleSignOut}
          >
            <PiSignOutBold size="24px" color="white" />
          </Button>
        </Flex>
        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Button
            borderRadius="24px"
            colorScheme="gray"
            bg={selectedPage === "Profile" ? "#ffffff" : "transparent"}
            color={selectedPage === "Profile" ? "black" : "white"}
            onClick={handleProfileClick}
          >
            <MdAccountCircle
              size="24px"
              color={selectedPage === "Profile" ? "black" : "white"}
            />
          </Button>
          <Text color="white" fontWeight="semibold" fontSize="12px">
            Biblioteca
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
