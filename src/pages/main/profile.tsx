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
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

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
      backgroundColor="#1f1f1f"
      width="100vw"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 100px)", md: "100vh" }}
      color="white"
    >
      <Flex
        flexDirection="column"
        height={{ base: "calc(100vh - 124px)", md: "100%" }}
        align="center"
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
          <Icon as={PiSignOutBold} h={6} w={6} />
        </Button>
        <Avatar size="2xl" name={userName} marginTop={8} />
        <Text
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="bold"
          marginTop={8}
        >
          {userName}
        </Text>
        <Flex
          width={{ base: "350px", md: "400px" }}
          flexDirection="column"
          marginTop={12}
          gap={4}
        >
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            textAlign="center"
          >
            Podcasts mais escutados
          </Text>
          <Flex width="80%" marginX="auto" flexDirection="column" gap={4}>
            {episodes?.slice(0, 2).map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
