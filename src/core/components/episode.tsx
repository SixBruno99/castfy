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
  const { removeFavorite } = useEpisode();
  const navigate = useNavigate();
  const toast = useToast();

  const handleListenClick = () => {
    navigate(`/episode/${id}`);
  };

  const handleRemoveFav = async () => {
    await removeFavorite(id);
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
      data-testid="episode"
      cursor="pointer"
      transition="all"
      transitionDuration="500"
      _hover={{ opacity: 0.8 }}
    >
      <Flex height="156px">
        <Image src={image.url} borderRadius={8} objectFit="fill" />
      </Flex>
      <Flex
        gap={2}
        width="100%"
        alignItems="center"
        justifyContent="space-between"
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

        <Text color="white" fontWeight="bold" isTruncated>
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
