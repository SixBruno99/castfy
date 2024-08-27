import { Text, Box, Divider, Grid } from "@chakra-ui/react";
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
      overflowX="hidden"
    >
      <Text
        fontSize={{ base: "20px", md: "36px" }}
        fontWeight="bold"
        color="white"
      >
        Para você:
      </Text>
      <Divider orientation="horizontal" />
      <Grid marginY={4} pb={8} gap={4} templateColumns="repeat(auto-fill, minmax(232px, 1fr))">
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
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum lorem ipsum lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum lorem ipsum lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum lorem ipsum lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
        <Episode
          key={1}
          id={"1"}
          title={"lorem ipsum"}
          image={""}
          favorite={false}
          showFavorite={false}
        />
      </Grid>
    </Box>
  );
}
