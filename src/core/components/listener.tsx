import { Flex, Image, Text } from "@chakra-ui/react";
import { useEpisode } from "../../contexts/episode";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";

export function Listener() {
  const { id } = useParams();
  const { episode, findOne } = useEpisode();

  useEffect(() => {
    findOne(id as string);
  }, []);

  return (
    <Flex
      width="full"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#1F1F1F"
    >
      <Flex flexDirection="column" width="324px" gap={4}>
        <Image src={episode?.imageUrl} alt={id} height="276px" width="full" />
        <Text color="white" fontWeight="bold" textAlign="center">
          {episode?.title}
        </Text>

        <Flex justifyContent="center" alignItems="center" gap={4} color="white">
          <audio controls>
            <source src={episode?.audioUrl} type="audio/mp3" />
          </audio>
        </Flex>
      </Flex>
    </Flex>
  );
}
