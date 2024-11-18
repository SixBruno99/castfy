import { VStack, Button, Icon, Flex } from "@chakra-ui/react";
import { MdHomeFilled, MdAccountCircle, MdSearch } from "react-icons/md";
import { FiUploadCloud } from "react-icons/fi";
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
    navigate(`/search`);
  };

  const handleUploadClick = () => {
    onNavigate("Upload");
    navigate(`/upload`);
  };

  const handleProfileClick = () => {
    onNavigate("Profile");
    navigate(`/profile`);
  };

  return (
    <Flex
      height="64px"
      width="100%"
      justifyContent="space-evenly"
      alignItems="center"
      backgroundColor="black"
      borderTop="1px solid #383838"
    >
      <VStack>
        <Button
          borderRadius={"24px"}
          colorScheme="gray"
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
      </VStack>

      <VStack>
        <Button
          borderRadius={"24px"}
          colorScheme="gray"
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
      </VStack>

      <VStack>
        <Button
          borderRadius={"24px"}
          colorScheme="gray"
          height={"40px"}
          bg={selectedPage === "Upload" ? "#ffffff" : "transparent"}
          color={selectedPage === "Upload" ? "black" : "white"}
          onClick={handleUploadClick}
        >
          <Icon
            as={FiUploadCloud}
            h={6}
            w={6}
            color={selectedPage === "Upload" ? "black" : "white"}
          />
        </Button>
      </VStack>

      <VStack>
        <Button
          borderRadius={"24px"}
          colorScheme="gray"
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
      </VStack>
    </Flex>
  );
}
