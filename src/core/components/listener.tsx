import {
  Flex,
  Image,
  Text,
  Box,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEpisode } from "../../contexts/episode";
import { useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStar } from "react-icons/fa";
import { TbRewindBackward10, TbRewindForward10 } from "react-icons/tb";

export function Listener() {
  const { id } = useParams();
  const { episode, favEpisodes, findOne, addFovorite, removeFavorite } =
    useEpisode();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toast = useToast();

  useEffect(() => {
    findOne(id as string);
  }, [id, findOne]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateDuration);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
        audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  }, [episode]);

  useEffect(() => {
    setIsFavorite(favEpisodes?.some((fav) => fav.id === id) ?? false);
  }, [favEpisodes, id]);

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime + 10 < duration) {
        audioRef.current.currentTime += 10;
      } else {
        audioRef.current.currentTime = duration;
      }
    }
  };

  const handleBackward = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime - 10 > 0) {
        audioRef.current.currentTime -= 10;
      } else {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handleFavorite = async () => {
    if (id) {
      if (isFavorite) {
        await removeFavorite(id);
        toast({
          title: "Episódio removido dos favoritos",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        await addFovorite(id);
        toast({
          title: "Episódio adicionado aos favoritos",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
      setIsFavorite(!isFavorite);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Flex
      width="full"
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
      alignItems="center"
      justifyContent="center"
      backgroundColor="#1F1F1F"
    >
      <Flex
        flexDirection="column"
        width={{base: "324px", md: "364px"}}
        backgroundColor="#121212"
        boxShadow="dark-lg"
        borderRadius={8}
        padding={4}
        gap={4}
      >
        <Image
          src={episode?.imageUrl}
          alt={id}
          borderRadius={8}
          height="232px"
          width="full"
        />
        <Text color="white" fontWeight="bold" textAlign="center">
          {episode?.title}
        </Text>

        <Box backgroundColor="transparent" width="full">
          <audio ref={audioRef} controls style={{ display: "none" }}>
            <source src={episode?.audioUrl} type="audio/mp3" />
          </audio>
          <Flex
            justifyContent="center"
            alignItems="center"
            gap={4}
            color="white"
          >
            <IconButton
              icon={<FaStepBackward />}
              onClick={handleRewind}
              aria-label="Rewind"
              variant="ghost"
              color="white"
              _hover={{ backgroundColor: "#181818" }}
            />
            <IconButton
              icon={<TbRewindBackward10 />}
              onClick={handleBackward}
              aria-label="Rewind"
              variant="ghost"
              color="white"
              _hover={{ backgroundColor: "#181818" }}
            />
            <IconButton
              icon={isPlaying ? <FaPause /> : <FaPlay />}
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              variant="ghost"
              color="white"
              _hover={{ backgroundColor: "#181818" }}
            />
            <IconButton
              icon={<TbRewindForward10 />}
              onClick={handleForward}
              aria-label="Forward"
              variant="ghost"
              color="white"
              _hover={{ backgroundColor: "#181818" }}
            />
            <IconButton
              icon={<FaStar />}
              onClick={handleFavorite}
              aria-label="Favorite"
              variant="ghost"
              color={isFavorite ? "#015BC4" : "white"}
              _hover={{ backgroundColor: "#181818" }}
            />
          </Flex>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            color="white"
            mt={2}
          >
            <Text>{formatTime(currentTime)}</Text>
            <Slider
              value={currentTime}
              max={duration}
              onChange={(val) => {
                if (audioRef.current) {
                  audioRef.current.currentTime = val;
                }
              }}
              flex="1"
              mx={2}
            >
              <SliderTrack bg="gray.700">
                <SliderFilledTrack bg="white" />
              </SliderTrack>
              <SliderThumb boxSize={3} />
            </Slider>
            <Text>{formatTime(duration)}</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
}
