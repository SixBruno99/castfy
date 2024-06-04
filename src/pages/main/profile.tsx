import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useEpisode } from "../../contexts/episode";
import { Episode } from "../../core/components/episode";

export function Profile() {
  const { episodes } = useEpisode();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Tentativa de obter o nome do usuário do localStorage
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
