import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useUserEpisodes } from "../../contexts/user-episodes";
import { useAuth } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { getCreatePodcastDate } from "../../utils/formattedDate";
import { UserEpisode } from "../../core/components/user-episodes";
import { FaEdit } from "react-icons/fa";
import defaultImage from "../../assets/images/default-image.jpg";

export function Profile() {
  const { signOut } = useAuth();
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
            <Tab color="white" _selected={{ bg: "blue.500" }}>
              Vídeos
            </Tab>
            <Tab color="white" _selected={{ bg: "blue.500" }}>
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
              <Flex
                gap={4}
                width="100%"
                maxWidth="360px"
                backgroundColor="#181818"
                padding={{ base: 2, md: 4 }}
                borderRadius={{ base: 12, md: 16 }}
              >
                <Flex
                  width="100%"
                  flexDirection="column"
                  justifyContent="space-between"
                >
                  <Flex
                    gap={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      height={{ base: "76px", md: "124px" }}
                      maxWidth={{ base: "124px", md: "196px" }}
                    >
                      <Image
                        borderRadius={{ base: 8, md: 12 }}
                        height={{ base: "76px", md: "124px" }}
                        maxWidth={{ base: "124px", md: "196px" }}
                        src={userData ? userData.imageUrl : defaultImage}
                      />
                    </Box>
                    <Text
                      noOfLines={1}
                      fontWeight="bold"
                      fontSize={{ base: "18px", md: "24px" }}
                    >
                      {userData && userData.name}
                    </Text>
                    <Box />
                  </Flex>
                  <Flex
                    maxWidth="400px"
                    flexDirection="column"
                    justifyContent="space-between"
                    gap={4}
                    paddingY={4}
                  >
                    <Flex gap={4} justifyContent="space-between">
                      <Text
                        color="lightgray"
                        fontSize="14px"
                        fontStyle="italic"
                        noOfLines={4}
                      >
                        {userData && userData.description}
                      </Text>
                      <Box>
                        <FaEdit size="14px" />
                      </Box>
                    </Flex>
                    <Text color="lightgray" fontSize="14px" fontStyle="italic">
                      No Castfy desde{" "}
                      {userData && getCreatePodcastDate(userData.createdAt)}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
