import { useNavigate } from "react-router-dom";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { getCreateEpisodeData } from "../../utils/formattedDate";
import defaultImage from "../../assets/images/default-image.jpg";

interface IProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date | string;
}

export function UserEpisode(episode: IProps) {
  const navigate = useNavigate();

  const handleListenClick = () => navigate(`/episode/${episode.id}`);

  return (
    <Flex
      width="100%"
      maxWidth="640px"
      cursor="pointer"
      backgroundColor="#181818"
      gap={4}
      padding={{ base: 2, md: 4 }}
      borderRadius={{ base: 12, md: 16 }}
      onClick={handleListenClick}
    >
      <Box
        height={{ base: "76px", md: "124px" }}
        maxWidth={{ base: "124px", md: "196px" }}
        width="100%"
      >
        <Image
          height={{ base: "76px", md: "124px" }}
          maxWidth={{ base: "124px", md: "196px" }}
          borderRadius={{ base: 8, md: 12 }}
          src={episode.imageUrl || defaultImage}
        />
      </Box>
      <Flex flexDirection="column" justifyContent="space-around">
        <Box maxWidth="432px">
          <Text
            fontSize={{ base: "12px", md: "18px" }}
            fontWeight="bold"
            noOfLines={{ base: 1, md: 2 }}
          >
            {episode.title}
          </Text>
        </Box>
        <Grid gap={2}>
          <Flex gap={1}>
            <Text
              color="lightgray"
              fontSize="14px"
              fontStyle="italic"
              display={{ base: "none", md: "inline" }}
            >
              Criado em:
            </Text>
            <Text color="lightgray" fontSize="14px" fontStyle="italic">
              {getCreateEpisodeData(episode.createdAt)}
            </Text>
          </Flex>
          <Text
            color="lightgray"
            fontSize="14px"
            fontStyle="italic"
            isTruncated
          >
            {episode.description}
          </Text>
        </Grid>
      </Flex>
    </Flex>
  );
}
