import { Text, Box, VStack, Divider, Flex } from "@chakra-ui/react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";

export function Home() {
  const { episodes } = useEpisode();

  return (
    <Box
      backgroundColor="#1f1f1f"
      width={"100vw"}
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 100px)", md: "100vh" }}
    >
      <VStack display={"initial"}>
        <Box minHeight={150}>
          <VStack display={"initial"}>
            <Text fontSize={{ base: "20px", md: "36px" }} fontWeight="bold" color={"white"}>
              Para você:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {episodes?.map((episode, idx) => (
                <Episode
                  key={idx}
                  id={episode.id}
                  title={episode.title}
                  image={episode.image}
                  favorite={false}
                  showFavorite={false}
                />
              ))}
            </Flex>
          </VStack>
        </Box>

        <Box minHeight={150}>
          <VStack display={"initial"} spacing={0}>
            <Text fontSize={{ base: "20px", md: "36px" }} fontWeight="bold" color={"white"}>
              Recentemente Ouvidos:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {episodes
                ?.map((episode, idx) => (
                  <Episode
                    key={idx}
                    id={episode.id}
                    title={episode.title}
                    image={episode.image}
                    showFavorite={false}
                  />
                ))
                .reverse()}
            </Flex>
          </VStack>
        </Box>
        
      </VStack>
    </Box>
  );
}
