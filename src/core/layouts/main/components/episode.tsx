import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { IEpisodes } from "../../../../types/episode";
import { useNavigate } from "react-router-dom";

export function Episode({ id, title, image }: IEpisodes) {
  const navigate = useNavigate();

  const handleListenClick = () => {
    navigate(`/episode/${id}`);
  };

  return (
    <Flex alignItems="center" gap={4}>
      <Image src={image.url} height="64px" width="64px" />
      <Text color="white" fontWeight="bold">
        {title}
      </Text>
      <Button variant="link" onClick={handleListenClick}>
        Escutar
      </Button>
    </Flex>
  );
}
