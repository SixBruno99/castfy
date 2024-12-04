import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { useEpisode } from "../../contexts/episode";
import { useUserEpisodes } from "../../contexts/user-episodes";
import { UserEpisode } from "../../core/components/user-episodes";
import { FavEpisodes } from "../../core/components/favEpisodes";
import { getCreatePodcastDate } from "../../utils/formattedDate";
import { PiSignOutBold } from "react-icons/pi";
import { About } from "../../core/components/about";

export function Profile() {
  const { signOut } = useAuth();
  const { favEpisodes } = useEpisode();
  const { userData, userEpisodes } = useUserEpisodes();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate(`/`);
  };

  return (
    <Flex
      gap={8}
      color="white"
      flexDirection="column"
      backgroundColor="#1f1f1f"
      paddingX={{ base: "32px", md: "128px" }}
      paddingY={{ base: "32px", md: "64px" }}
      alignItems={{ base: "center", md: "start" }}
      justifyContent={{ base: "center", md: "start" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <Button
        display={{ base: "grid", md: "none" }}
        alignSelf="end"
        width="48px"
        height="48px"
        color="white"
        bg="transparent"
        borderRadius="24px"
        onClick={handleSignOut}
      >
        <Icon as={PiSignOutBold} width="24px" height="24px" />
      </Button>

      <Flex gap={8} alignItems="center" width={{ base: "350px", md: "100%" }}>
        <Avatar
          src={userData && userData.imageUrl}
          size={{ base: "xl", md: "2xl" }}
        />
        <Grid gap={4}>
          <Text
            fontSize={{ base: "18px", md: "24px" }}
            fontWeight="bold"
            isTruncated
          >
            {userData && userData.name}
          </Text>
          <Text fontSize={{ base: "12px", md: "16px" }} fontStyle="italic">
            Castfyer desde{" "}
            {userData && getCreatePodcastDate(userData.createdAt)}
          </Text>
        </Grid>
      </Flex>

      <Box width={{ base: "350px", md: "100%" }}>
        <Tabs variant="soft-rounded">
          <TabList gap={2}>
            <Tab minWidth="120px" color="white" _selected={{ bg: "blue.500" }}>
              Episódios
            </Tab>
            <Tab minWidth="120px" color="white" _selected={{ bg: "blue.500" }}>
              Favoritos
            </Tab>
            <Tab minWidth="120px" color="white" _selected={{ bg: "blue.500" }}>
              Sobre
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel paddingX={0}>
              <Grid
                gap={4}
                gridTemplateColumns="repeat(auto-fill, minmax(340px, 1fr))"
              >
                {userEpisodes?.map((episode, idx) => (
                  <UserEpisode
                    key={idx}
                    id={episode.id}
                    title={episode.title}
                    description={episode.description}
                    imageUrl={episode.imageUrl}
                    createdAt={episode.createdAt}
                  />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel paddingX={0}>
              <FavEpisodes favEpisodes={favEpisodes} />
            </TabPanel>
            <TabPanel paddingX={0}>
              <About userData={userData} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
