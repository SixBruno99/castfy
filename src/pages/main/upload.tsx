import {
  Text,
  Box,
  Button,
  Textarea,
  VStack,
  Flex,
  Image,
  useToast,
  CircularProgress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useState, useRef } from "react";
import { usePodcast } from "../../contexts/podcast-upload";
import { CATEGORIES } from "../../mocks/categories";
import { useNavigate } from "react-router-dom";

export function Upload() {
  const toast = useToast();
  const navigate = useNavigate();

  const { audioUpload } = usePodcast();
  const audioInputRefer = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [title, setTitle] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const [categoryValue, setCategoryValue] = useState<string>("");
  const [categoryLabel, setCategoryLabel] = useState<string>(
    "Selecione uma categoria"
  );
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setCategoryLabel(category);
  };

  const handleAudioFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setAudioFile(file); // Salva o arquivo de audio selecionado
      setAudioPreview(URL.createObjectURL(file)); // Cria uma URL temporária para o áudio selecionado
    }
  };

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file); // Salva o arquivo de imagem selecionado
      setImagePreview(URL.createObjectURL(file)); // Cria uma URL temporária para a imagem selecionada
    }
  };

  const handleAudioButtonClick = () => {
    if (audioInputRefer.current) {
      audioInputRefer.current.click();
    }
  };

  const handleImageButtonClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength - 3) + "...";
    }
    return fileName;
  };

  const sendPodcast = async () => {
    if (!title && !description && !categoryLabel) {
      setTitleError("Insira um título");
      setDescriptionError("Insira uma descrição");
      setCategoryError("Selecione uma categoria");
      return;
    }

    if (!title) {
      setTitleError("Insira um título");
      setDescriptionError("");
      setCategoryError("");
      return;
    }

    if (!description) {
      setTitleError("");
      setDescriptionError("Insira uma descrição");
      setCategoryError("");
      return;
    }

    if (!categoryLabel) {
      setTitleError("");
      setDescriptionError("");
      setCategoryError("Selecione uma categoria");
      return;
    }

    setTitleError("");
    setDescriptionError("");
    setCategoryError("");
    setIsLoading(true);
    if (!audioFile) {
      setIsLoading(false);
      return toast({
        title: "Erro ao carregar arquivo de áudio",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    if (!imageFile) {
      setIsLoading(false);
      return toast({
        title: "Erro ao enviar imagem",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

    const uploaded = await audioUpload({
      audio: audioFile,
      title,
      description,
      categories: [categoryValue],
      image: imageFile,
    });

    if (uploaded) {
      toast({
        title: "Parabéns, você adicionou um episódio!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
      return navigate(`/profile`);
    }

    setIsLoading(false);

    toast({
      title: "Ocorreu um erro ao enviar episódio, tente novamente",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#1f1f1f"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <VStack spacing={0} alignItems="center" margin="0 auto">
        <Text
          fontSize={{ base: "24px", md: "36px" }}
          fontWeight="bold"
          color="white"
        >
          Envie seu Podcast
        </Text>

        <Text
          marginBottom={8}
          fontSize={{ base: "14px", md: "16px" }}
          color="white"
        >
          Faça o upload do seu podcast para milhares de pessoas ouvirem.
        </Text>

        <input
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          ref={audioInputRefer}
          onChange={handleAudioFileChange}
        />

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={handleImageFileChange}
        />

        <Flex
          direction={{ base: "column", "2xl": "column" }}
          marginBottom={8}
          alignItems={{ base: "center" }}
          justifyContent="start"
          width="100%"
          gap={4}
        >
          <Menu>
            <MenuButton
              width={250}
              as={Button}
              rightIcon={<FaChevronDown />}
              backgroundColor="#004aad"
              color="white"
              colorScheme="blue"
            >
              {categoryLabel}
            </MenuButton>
            <MenuList maxHeight="200px" overflowY="auto">
              {CATEGORIES.map((item, idx) => (
                <MenuItem
                  key={idx}
                  value={item.value}
                  onClick={(e) => {
                    const target = e.target as HTMLButtonElement;
                    handleSelectCategory(item.label);
                    setCategoryValue(target.value);
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          {categoryError && (
            <Text fontSize="12px" color="red">
              {categoryError}
            </Text>
          )}

          <Textarea
            id="titulo"
            flex={3}
            minH={45}
            maxH={45}
            placeholder="Digite um título para o seu podcast..."
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            backgroundColor="white"
            color="black"
            resize="none"
            height="35px"
            width="full"
          />

          {titleError && (
            <Text fontSize="12px" color="red">
              {titleError}
            </Text>
          )}

          <Textarea
            id="Description"
            flex={3}
            minH={200}
            placeholder="Digite uma descrição para o seu podcast..."
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            backgroundColor="white"
            color="black"
            resize="none"
            height="150px"
            width="full"
          />

          {descriptionError && (
            <Text fontSize="12px" color="red">
              {descriptionError}
            </Text>
          )}

          <Flex
            direction={{ base: "column", sm: "row" }}
            alignItems={{ base: "center", sm: "end" }}
            gap={4}
            flex={2}
          >
            <VStack alignItems={"center"} spacing={2}>
              {imagePreview && (
                <Image
                  src={imagePreview}
                  alt="Preview da Imagem"
                  boxSize="100px"
                  objectFit="cover"
                  borderRadius="md"
                  display={{ base: "block", lg: "block" }}
                />
              )}
              <Button
                id="botaoImagem"
                color="white"
                backgroundColor="#004aad"
                colorScheme="blue"
                width="full"
                onClick={handleImageButtonClick}
              >
                {imageFile
                  ? truncateFileName(imageFile.name, 20)
                  : "Imagem de Capa"}
              </Button>
            </VStack>

            <VStack spacing={2}>
              {audioPreview && (
                <audio
                  controls
                  src={audioPreview}
                  style={{ marginBottom: "10px", maxWidth: "220px" }}
                >
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              )}
              <Button
                minH={35}
                id="botaoAudio"
                color="white"
                backgroundColor="#004aad"
                colorScheme="blue"
                width="full"
                onClick={handleAudioButtonClick}
              >
                {audioFile
                  ? truncateFileName(audioFile?.name, 20)
                  : "Arquivo de Áudio"}
              </Button>
            </VStack>
          </Flex>
        </Flex>

        <Button
          id="botaoUpload"
          color="white"
          backgroundColor="#004aad"
          colorScheme="blue"
          width={{ base: "full" }}
          onClick={sendPodcast}
          isLoading={isLoading}
        >
          {isLoading ? (
            <CircularProgress isIndeterminate color="white" size="24px" />
          ) : (
            "Fazer Upload"
          )}
        </Button>
      </VStack>
    </Box>
  );
}
