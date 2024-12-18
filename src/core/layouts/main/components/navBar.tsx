import { Flex, Image, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../../../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { FiUploadCloud } from "react-icons/fi";
import {
  MdHomeFilled,
  MdAccountCircle,
  MdSearch,
  MdOutlineCreateNewFolder,
} from "react-icons/md";

interface NavBarProps {
  selectedPage: string;
  onNavigate: (page: string) => void;
}

export function NavBar(props: NavBarProps) {
  const { selectedPage, onNavigate } = props;
  const { userHasPodcast, signOut } = useAuth();
  const navigate = useNavigate();

  const handleListenClick = () => {
    onNavigate("Home");
    navigate(`/`);
  };

  const handleSearchClick = () => {
    onNavigate("Search");
    navigate(`/search`);
  };

  const handleProfileClick = () => {
    onNavigate("Profile");
    navigate(`/profile`);
  };

  const handleUploadClick = () => {
    onNavigate("Upload");
    navigate(`/upload`);
  };

  const handleCreateClick = () => {
    onNavigate("Create");
    navigate(`/create`);
  };

  const handleSignOut = () => {
    signOut();
    navigate(`/`);
  };

  return (
    <Flex
      maxHeight="100vh"
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

        {userHasPodcast ? (
          <Flex flexDirection="column" alignItems="center" gap={2}>
            <Button
              borderRadius="24px"
              colorScheme="gray"
              bg={selectedPage === "Upload" ? "#ffffff" : "transparent"}
              color={selectedPage === "Upload" ? "black" : "white"}
              onClick={handleUploadClick}
            >
              <FiUploadCloud
                size="24px"
                color={selectedPage === "Upload" ? "black" : "white"}
              />
            </Button>
            <Text color="white" fontWeight="semibold" fontSize="12px">
              Upload
            </Text>
          </Flex>
        ) : (
          <Flex flexDirection="column" alignItems="center" gap={2}>
            <Button
              borderRadius="24px"
              colorScheme="gray"
              bg={selectedPage === "Create" ? "#ffffff" : "transparent"}
              color={selectedPage === "Create" ? "black" : "white"}
              onClick={handleCreateClick}
            >
              <MdOutlineCreateNewFolder
                size="24px"
                color={selectedPage === "Create" ? "black" : "white"}
              />
            </Button>
            <Text color="white" fontWeight="semibold" fontSize="12px">
              Criar
            </Text>
          </Flex>
        )}
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
            Perfil
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
