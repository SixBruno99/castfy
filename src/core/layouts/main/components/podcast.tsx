import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { IPodcast } from "../../../../types/podcast";
import { useNavigate } from "react-router-dom";

export function Podcast({ id, name, image }: IPodcast) {
  const navigate = useNavigate();

  const handleListenClick = () => { 
    const encodedImage = encodeURIComponent(image);
    navigate(`/listener/${id}/${name}/${encodedImage}`);
  };

  return (
    <Flex alignItems="center" gap={4}>
      <Image src={image} alt={id} height="64px" width="64px" />
      <Text color="white" fontWeight="bold">
        {name}
      </Text>
      <Button variant="link" onClick={handleListenClick}>
        Escutar
      </Button>
    </Flex>
  );
}
