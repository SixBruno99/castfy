import { Flex, Image, Text } from "@chakra-ui/react";
import { FaPlay, FaStepBackward, FaStepForward } from "react-icons/fa";
import { useParams } from "react-router-dom";

export function Listener() {
  const { id, name, image } = useParams();
  return (
    <Flex
      width="full"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#1F1F1F"
    >
      <Flex flexDirection="column" width="324px" gap={4}>
        <Image src={image} alt={id} height="276px" width="full" />
        <Text color="white" fontWeight="bold" textAlign="center">
          {name}
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
