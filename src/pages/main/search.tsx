import { Box, VStack, Flex, Input, Text } from "@chakra-ui/react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";
import { useState } from "react";

export function Search() {
  const { episodes } = useEpisode();
  const [search, setSearch] = useState("");

  const filteredEpisodes = episodes?.filter((episode) =>
    episode.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box
      backgroundColor="#1f1f1f"
      width={"100vw"}
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 100px)", md: "100vh" }}
    >
      <Input
        placeholder="Pesquisar..."
        color="white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <VStack display={"initial"}>
        <Box minHeight={150}>
          <VStack display={"initial"}>
            {filteredEpisodes?.length ? (
              <Flex marginTop={20} flexDirection="column" gap={4}>
                {filteredEpisodes?.map((episode, idx) => (
                  <Episode
                    key={idx}
                    id={episode.id}
                    title={episode.title}
                    image={episode.image}
                    showFavorite={false}
                  />
                ))}
              </Flex>
            ) : (
              <Text
                marginTop={40}
                color="white"
                fontWeight="bold"
                textAlign="center"
                fontSize={40}
              >
                Opss... Podcast não encontrado
              </Text>
            )}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
