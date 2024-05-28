import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { IEpisodes } from "../../types/episode";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export function Episode({ id, title, image, favorite }: IEpisodes) {
  const navigate = useNavigate();

  const handleListenClick = () => {
    navigate(`/episode/${id}`);
  };

  return (
    <Flex alignItems="center">
      <IconButton
        icon={<FaStar />}
        aria-label="Favorite"
        variant="ghost"
        color={favorite ? "#015BC4" : "white"}
        _hover={{ backgroundColor: "#181818" }}
        mx={4}
      />
      <Flex
        alignItems="center"
        gap={4}
        cursor="pointer"
        onClick={handleListenClick}
      >
        <Image src={image.url} height="64px" width="64px" />
        <Text color="white" fontWeight="bold">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
}
