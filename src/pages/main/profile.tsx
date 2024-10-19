import {
  Avatar,
  Box,
  Flex,
  Grid,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useUserEpisodes } from "../../contexts/user-episodes";
// import { useAuth } from "../../contexts/auth";
// import { useNavigate } from "react-router-dom";
// import { PiSignOutBold } from "react-icons/pi";
import mockImg from "../../assets/images/flow.jpg";
import mockImg2 from "../../assets/images/mano-a-mano.jpg";
import {
  getCreatePodcastDate,
  getCreateEpisodeData,
} from "../../utils/formattedDate";

export function Profile() {
  // const { signOut } = useAuth();
  const { userData, userEpisodes } = useUserEpisodes();
  // const navigate = useNavigate();

  // const handleSignOut = () => {
  //   signOut();
  //   navigate(`/`);
  // };

  return (
    <Flex
      color="white"
      flexDirection="column"
      backgroundColor="#1f1f1f"
      gap={{ base: 0, md: 8 }}
      paddingX={{ base: "32px", md: "128px" }}
      paddingY={{ base: "32px", md: "64px" }}
      alignItems={{ base: "center", md: "start" }}
      justifyContent={{ base: "space-around", md: "start" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      {/* <Button
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
      </Button> */}

      <Flex gap={8} alignItems="center" width={{ base: "300px", md: "80%" }}>
        <Avatar size={{ base: "xl", md: "2xl" }} name={userData?.name} />
        <Grid gap={4}>
          <Text fontSize={{ base: "18px", md: "24px" }} fontWeight="bold">
            {userData && userData.name}
          </Text>
          <Text fontSize={{ base: "12px", md: "16px" }} fontStyle="italic">
            Castfyer desde{" "}
            {userData && getCreatePodcastDate(userData.createdAt)}
          </Text>
        </Grid>
      </Flex>

      <Box width={{ base: "300px", md: "80%" }}>
        <Tabs variant="soft-rounded">
          <TabList gap={2}>
            <Tab color="white" _selected={{ bg: "blue.500" }}>
              Vídeos
            </Tab>
            <Tab color="white" _selected={{ bg: "blue.500" }}>
              Sobre
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel paddingX={0}>
              <Flex gap={4} flexDirection="column">
                {userEpisodes?.map((episode, idx) => (
                  <Flex key={idx} gap={4}>
                    {/* <Image src={episode.podcastId}/> */}
                    <Image
                      width={{ base: "64px", md: "128px" }}
                      src={mockImg}
                    />
                    <Grid>
                      <Text>{episode.title}</Text>
                      <Text>
                        Criado em: {getCreateEpisodeData(episode.createdAt)}
                      </Text>
                      <Text>{episode.description}</Text>
                    </Grid>
                  </Flex>
                ))}
              </Flex>
            </TabPanel>
            <TabPanel paddingX={0}>
              <Flex gap={4}>
                <Image width={{ base: "64px", md: "128px" }} src={mockImg2} />
                <Flex flexDirection="column" justifyContent="center">
                  <Text>{userData && userData.description}</Text>
                  <Text>
                    No Castfy desde{" "}
                    {userData && getCreatePodcastDate(userData.createdAt)}
                  </Text>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
