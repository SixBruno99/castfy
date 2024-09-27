import { Box, Input, Text, Grid } from "@chakra-ui/react";
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
      height="100%"
      width="100%"
      overflow="hidden"
      backgroundColor="#1f1f1f"
      paddingY={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <Input
        width={{ base: "232px", md: "400px" }}
        marginLeft={{ base: "12px", md: "24px" }}
        color="white"
        value={search}
        position="fixed"
        placeholder="Pesquisar..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <Box
        height="calc(100vh - 64px)"
        overflow="auto"
        display={{ base: "flex", md: "block" }}
        justifyContent="center"
        marginTop="64px"
      >
        {filteredEpisodes?.length ? (
          <Grid
            gap={4}
            marginY={4}
            pb={{ base: 0, md: 8 }}
            templateColumns="repeat(auto-fill, minmax(232px, 1fr))"
          >
            {filteredEpisodes?.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
            {filteredEpisodes?.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
            {filteredEpisodes?.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
            {filteredEpisodes?.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
          </Grid>
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
      </Box>
    </Box>
  );
}
