import { Avatar, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";
import { useEpisode } from "../../contexts/episode";
import { useNavigate } from "react-router-dom";
import { Episode } from "../../core/components/episode";
import { PiSignOutBold } from "react-icons/pi";

export function Profile() {
  const { signOut } = useAuth();
  const { episodes } = useEpisode();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    setUserName("");
    navigate(`/`);
  };

  useEffect(() => {
    const name =
      localStorage.getItem("@user:name") ||
      sessionStorage.getItem("@user:name");
    if (name) {
      setUserName(name);
    }
  }, []);

  return (
    <Box
      width="100vw"
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
      padding={{ base: "12px", md: "24px" }}
      backgroundColor="#1f1f1f"
      color="white"
    >
      <Flex
        height={{ base: "calc(100vh - 88px)", md: "100%" }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          display={{ base: "grid", md: "none" }}
          alignSelf="end"
          borderRadius={"24px"}
          colorScheme="gray"
          width={"48px"}
          height={"48px"}
          bg={"transparent"}
          color={"white"}
          onClick={handleSignOut}
        >
          <Icon as={PiSignOutBold} width="24px" height="24px" />
        </Button>
        <Avatar
          size={{ base: "xl", md: "2xl" }}
          name={userName}
          marginTop={8}
        />
        <Text
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="bold"
          marginTop={8}
        >
          {userName}
        </Text>
        <Flex
          width={{ base: "300px", md: "400px" }}
          flexDirection="column"
          marginTop={{ base: "8px", md: "12px" }}
          gap={4}
        >
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            textAlign="center"
          >
            Podcast mais escutado:
          </Text>
          <Flex flexDirection="column" alignItems="center" gap={4}>
            {/* {episodes.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))} */}
            {episodes && (
              <Episode
                id={episodes[0].id!}
                title={episodes[0]?.title}
                image={episodes[0]?.image}
                showFavorite={false}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
