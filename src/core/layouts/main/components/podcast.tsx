import { Flex, Image, Text } from "@chakra-ui/react";
import { IPodcast } from "../../../../types/podcast";

export function Podcast({ id, name, image }: IPodcast) {

  return (
    <Flex alignItems="center" gap={4}>
      <Image src={image} alt={id} height="64px" width="64px"/>
      <Text color="white" fontWeight="bold">{name}</Text>
    </Flex>
  );
}
