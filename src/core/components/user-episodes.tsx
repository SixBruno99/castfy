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
      gap={4}
      width="100%"
      cursor="pointer"
      backgroundColor="#181818"
      padding={{ base: 2, md: 4 }}
      borderRadius={{ base: 12, md: 16 }}
      onClick={handleListenClick}
    >
      <Box
        width="100%"
        height={{ base: "76px", md: "96px" }}
        maxWidth={{ base: "96px", md: "124px" }}
      >
        <Image
          height={{ base: "76px", md: "96px" }}
          maxWidth={{ base: "96px", md: "124px" }}
          borderRadius={{ base: 8, md: 12 }}
          src={episode.imageUrl || defaultImage}
        />
      </Box>
      <Flex flexDirection="column" justifyContent="space-between">
        <Box>
          <Text
            fontSize={{ base: "12px", md: "18px" }}
            fontWeight="bold"
            noOfLines={1}
          >
            {episode.title}
          </Text>
        </Box>
        <Grid>
          <Flex gap={1}>
            <Text
              color="lightgray"
              fontSize="12px"
              fontStyle="italic"
              display={{ base: "none", md: "inline" }}
            >
              Criado em:
            </Text>
            <Text color="lightgray" fontSize="12px" fontStyle="italic">
              {getCreateEpisodeData(episode.createdAt)}
            </Text>
          </Flex>
          <Text
            color="lightgray"
            fontSize="12px"
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
