import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Flex,
  Grid,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import { getCreateEpisodeData } from "../../utils/formattedDate";
import { FaTrashAlt } from "react-icons/fa";
import defaultImage from "../../assets/images/default-image.jpg";
import { useUserEpisodes } from "../../contexts/user-episodes";

interface IProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date | string;
}

export function UserEpisode(episode: IProps) {
  const { removeEpisode } = useUserEpisodes();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleListenClick = () => navigate(`/episode/${episode.id}`);

  const handleDeleteEpisode = (id: string) => {
    removeEpisode(id);
    onClose();
  };

  return (
    <Flex
      gap={4}
      width="100%"
      backgroundColor="#181818"
      padding={{ base: "8px", md: "10px" }}
      borderRadius={{ base: 12, md: 16 }}
    >
      <Box
        width="100%"
        height={{ base: "76px", md: "96px" }}
        minWidth={{ base: "96px", md: "114px" }}
        maxWidth={{ base: "96px", md: "114px" }}
      >
        <Image
          cursor="pointer"
          onClick={handleListenClick}
          height={{ base: "76px", md: "96px" }}
          minWidth={{ base: "96px", md: "114px" }}
          maxWidth={{ base: "96px", md: "114px" }}
          borderRadius={{ base: 8, md: 12 }}
          src={episode.imageUrl || defaultImage}
        />
      </Box>
      <Flex width="100%" flexDirection="column" justifyContent="space-between">
        <Flex gap={2} alignItems="center" justifyContent="space-between">
          <Text
            _hover={{ textDecoration: "underline" }}
            noOfLines={1}
            cursor="pointer"
            fontWeight="bold"
            onClick={handleListenClick}
            fontSize={{ base: "12px", md: "16px" }}
          >
            {episode.title}
          </Text>
          <Box>
            <FaTrashAlt size="14px" onClick={onOpen} />
          </Box>

          <Modal size="xs" isCentered onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent bg="#181818">
              <ModalHeader color="white">Excluir episódio</ModalHeader>
              <ModalBody color="white">
                <Text>{episode.title}</Text>
                <Text fontWeight="bold">Será deletado permanentemente</Text>
              </ModalBody>
              <ModalFooter gap={4}>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                  colorScheme="red"
                  onClick={() => handleDeleteEpisode(episode.id)}
                >
                  Deletar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
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
