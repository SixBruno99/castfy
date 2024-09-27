import { Text, Box, VStack, Divider, Grid } from "@chakra-ui/react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";

export function Library() {
  const { favEpisodes } = useEpisode();

  return (
    <Box
      width="100%"
      backgroundColor="#1f1f1f"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <VStack display={"initial"}>
        <Box minHeight={150}>
          <VStack display={"initial"}>
            <Text
              fontSize={{ base: "20px", md: "36px" }}
              fontWeight="bold"
              color={"white"}
            >
              Favoritos:
            </Text>
            <Divider orientation="horizontal" />
            <Box
              display={{ base: "flex", md: "grid" }}
              flexDirection="column"
              alignItems={{ base: "center", md: "none" }}
            >
              <Grid
                marginY={4}
                pb={{ base: 0, md: 8 }}
                gap={4}
                templateColumns="repeat(auto-fill, minmax(232px, 1fr))"
              >
                {favEpisodes?.map((episode, idx) => (
                  <Episode
                    key={idx}
                    id={episode.id}
                    title={episode.title}
                    image={episode.image}
                    favorite={true}
                  />
                ))}
              </Grid>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
