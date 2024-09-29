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
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePodcast } from "../../contexts/create-podcast";

export function CreatePodcast() {
  const { createPodcast } = useCreatePodcast();
  const navigate = useNavigate();
  const toast = useToast();

  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [title, setTitle] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImageFile(file); // Salva o arquivo de imagem selecionado
      setImagePreview(URL.createObjectURL(file)); // Cria uma URL temporária para a imagem selecionada
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

  const sendCreatePodcastData = async () => {
    if (!title && !description) {
      setTitleError("Insira um título");
      setDescriptionError("Insira uma descrição");
      return;
    }

    if (!title) {
      setTitleError("Insira um título");
      setDescriptionError("");
      return;
    }

    if (!description) {
      setTitleError("");
      setDescriptionError("Insira uma descrição");
      return;
    }

    setTitleError("");
    setDescriptionError("");
    setIsLoading(true);

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

    const created = await createPodcast({
      name: title,
      description: description,
      image: imageFile,
    });

    setIsLoading(false);

    console.log({ created });

    if (created) {
      toast({
        title: "Parabéns, você criou seu podcast!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigate(`/upload`);
    }

    toast({
      title: "Ocorreu um erro ao criar podcast",
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
          Crie seu canal aqui!
        </Text>

        <Text
          marginBottom={8}
          fontSize={{ base: "14px", md: "16px" }}
          color="white"
        >
          Faça o upload de podcasts para milhares de pessoas ouvirem.
        </Text>

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
          <Textarea
            id="titulo"
            flex={3}
            minH={45}
            maxH={45}
            placeholder="Digite um nome para o seu canal..."
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
            placeholder="Fale um pouco sobre seu podcast aqui!"
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

          <VStack alignItems="center" spacing={2}>
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
        </Flex>

        <Button
          id="botaoUpload"
          color="white"
          backgroundColor="#004aad"
          colorScheme="blue"
          width={{ base: "full" }}
          onClick={sendCreatePodcastData}
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
