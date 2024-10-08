import { Text, Box, Divider, Grid } from "@chakra-ui/react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";

export function Home() {
  const { episodes } = useEpisode();

  return (
    <Box
      width="100%"
      backgroundColor="#1f1f1f"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <Text
        fontSize={{ base: "20px", md: "36px" }}
        fontWeight="bold"
        color="white"
      >
        Para você:
      </Text>
      <Divider orientation="horizontal" />
      <Box
        display={{ base: "flex", md: "grid" }}
        flexDirection="column"
        alignItems={{ base: "center", md: "none" }}
      >
        <Grid
          gap={4}
          marginY={4}
          pb={{ base: 0, md: 8 }}
          templateColumns="repeat(auto-fill, minmax(232px, 1fr))"
        >
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
          {/* {episodes?.map((episode, idx) => (
            <Episode
              key={idx}
              id={episode.id}
              title={episode.title}
              image={episode.image}
              favorite={false}
              showFavorite={false}
            />
          ))} */}
        </Grid>
      </Box>
    </Box>
  );
}
