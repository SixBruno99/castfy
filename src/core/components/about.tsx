import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { IUserData } from "../../types/user-episodes";
import { FaEdit } from "react-icons/fa";
import defaultImage from "../../assets/images/default-image.jpg";
import { getCreatePodcastDate } from "../../utils/formattedDate";

interface IProps {
    userData: IUserData | undefined;
}

export function About({ userData }: IProps) {
  return (
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
  );
}
