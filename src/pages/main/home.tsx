import { Text, Box, VStack, Divider, Flex } from "@chakra-ui/react";
import { Podcast } from "../../core/layouts/main/components/podcast";
import {
  PODCAST_FOR_YOU,
  PODCAST_MOST_LISTENED,
  PODCAST_RECENTLY_LISTENED,
} from "../../mocks/podcasts";

export function Home() {
  return (
    <Box backgroundColor="#1f1f1f" width={"calc(100vw - 150px)"} padding={50}>
      <VStack display={"initial"}>
        <Box minHeight={150}>
          <VStack display={"initial"}>
            <Text fontSize="35px" fontWeight="bold" color={"white"}>
              Para você:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {PODCAST_FOR_YOU.map((podcast, idx) => (
                <Podcast
                  key={idx}
                  id={podcast.id}
                  name={podcast.name}
                  image={podcast.image}
                />
              ))}
            </Flex>
          </VStack>
        </Box>

        <Box minHeight={150}>
          <VStack display={"initial"} spacing={0}>
            <Text fontSize="35px" fontWeight="bold" color={"white"}>
              Recentemente Ouvidos:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {PODCAST_RECENTLY_LISTENED.map((podcast, idx) => (
                <Podcast
                  key={idx}
                  id={podcast.id}
                  name={podcast.name}
                  image={podcast.image}
                />
              ))}
            </Flex>
          </VStack>
        </Box>

        <Box minHeight={150}>
          <VStack display={"initial"} spacing={0}>
            <Text fontSize="35px" fontWeight="bold" color={"white"}>
              Mais Escutados no Dia:
            </Text>
            <Divider orientation="horizontal" />
            <Flex flexDirection="column" marginY={4} gap={4}>
              {PODCAST_MOST_LISTENED.map((podcast, idx) => (
                <Podcast
                  key={idx}
                  id={podcast.id}
                  name={podcast.name}
                  image={podcast.image}
                />
              ))}
            </Flex>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}
