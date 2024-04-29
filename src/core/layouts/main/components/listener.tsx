import { Flex, Image, Text } from "@chakra-ui/react";
import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useEpisode } from "../../../../contexts/episode";
import { useEffect } from "react";

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
          <FaStepBackward
            onClick={() => {
              // Lógica para retroceder
            }}
          />
          <FaPlay
            onClick={() => {
              // Lógica para pausar/despausar
            }}
          />
          {/* <FaPause
            onClick={() => {
              // Lógica para pausar/despausar
            }}
          /> */}
          <FaStepForward
            onClick={() => {
              // Lógica para avançar
            }}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
