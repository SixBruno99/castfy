import { useNavigate } from "react-router-dom";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { getCreateEpisodeData } from "../../utils/formattedDate";
import mockImg from "../../assets/images/flow.jpg";

interface IProps {
  id: string;
  title: string;
  description: string;
  podcastId?: string;
  createdAt: Date | string;
}

export function UserEpisode(episode: IProps) {
  const navigate = useNavigate();

  const handleListenClick = () => navigate(`/episode/${episode.id}`);

  return (
    <Flex cursor="pointer" gap={4} onClick={handleListenClick}>
      {/* <Image src={episode.podcastId}/> */}
      <Box width={{ sm: "96px", md: "112px",lg: "124px", xl: "164px" }}>
        <Image borderRadius={16} src={mockImg} />
      </Box>
      <Flex flexDirection="column" justifyContent="space-around">
        <Box maxWidth="432px">
          <Text fontSize="20px" fontWeight="bold" noOfLines={2}>
            {episode.title}
          </Text>
        </Box>
        <Grid gap={2}>
          <Text color="lightgray" fontSize="14px" fontStyle="italic">
            Criado em: {getCreateEpisodeData(episode.createdAt)}
          </Text>
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
