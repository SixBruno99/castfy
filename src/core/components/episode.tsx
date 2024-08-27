import { Box, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { IEpisodes } from "../../types/episode";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEpisode } from "../../contexts/episode";
import { FaPlayCircle } from "react-icons/fa";

export function Episode({
  id,
  title,
  image,
  favorite,
  showFavorite = true,
}: IEpisodes) {
  const { removeFovorite } = useEpisode();
  const navigate = useNavigate();
  const toast = useToast();

  const handleListenClick = () => {
    navigate(`/episode/${id}`);
  };

  const handleRemoveFav = async () => {
    await removeFovorite(id);
    toast({
      title: "Episódio removido dos favoritos",
      status: "warning",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Flex
      height="224px"
      width="232px"
      alignItems="center"
      flexDirection="column"
      backgroundColor="#121212"
      boxShadow="dark-lg"
      borderRadius={8}
      padding={4}
      gap={4}
    >
      <Image
        src={image.url}
        borderRadius={8}
        height="224px"
        width="232px"
        object-fit="cover"
      />
      <Flex
        width="100%"
        gap={2}
        justifyContent="space-between"
        alignItems="center"
      >
        {showFavorite && (
          <Flex
            alignItems="center"
            justifyContent="center"
            minWidth="24px"
            minHeight="24px"
          >
            <FaStar
              size="16px"
              cursor="pointer"
              color={favorite ? "#015BC4" : "white"}
              onClick={handleRemoveFav}
            />
          </Flex>
        )}

        <Text color="white" fontWeight="bold" noOfLines={1}>
          {title}
        </Text>
        <Box minWidth="24px" minHeight="24px">
          <FaPlayCircle
            color="white"
            size="24px"
            cursor="pointer"
            onClick={handleListenClick}
          />
        </Box>
      </Flex>
    </Flex>
  );
}
