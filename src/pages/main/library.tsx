import { Text, Box, VStack, Divider, Flex } from "@chakra-ui/react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";

export function Library() {
  const { episodes } = useEpisode();

  return (
    <Box
      backgroundColor="#1f1f1f"
      width={"100vw"}
      padding={{ base: "12px", md: "24px" }}
      height={{ base: "calc(100vh - 100px)", md: "100vh" }}
    >
      <VStack display={"initial"}>
        <Box minHeight={150}>
          <VStack display={"initial"}>
            <Text fontSize={{ base: "20px", md: "36px" }} fontWeight="bold" color={"white"}>
              Episódios favoritos:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {episodes?.slice(0, 1).map((episode, idx) => (
                <Episode
                  key={idx}
                  id={episode.id}
                  title={episode.title}
                  image={episode.image}
                  favorite={true}
                />
              ))}
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
