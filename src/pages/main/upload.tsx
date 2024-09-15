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
import { usePodcast } from "../../contexts/podcast-upload";
export function Upload() {
  const { fileId, audioUpload, podcastUpload } = usePodcast();
  const toast = useToast();

  const audioInputRefer = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [titulo, setTitulo] = useState("");

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

    await audioUpload({ audio: audioFile });

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

    await podcastUpload({
      fileId: fileId,
      title: "",
      description: "",
      image: imageFile,
    });
    setIsLoading(false);

    toast({
      title: "Parabéns! Você adicionou um podcast!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100vw"
      backgroundColor="#1f1f1f"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
      overflowX="hidden"
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

        {/* Input de arquivo de áudio oculto */}
        <input
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          ref={audioInputRefer}
          onChange={handleAudioFileChange}
        />

        {/* Input de imagem oculto */}
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
          width={{ base: "100%", md: "100%" }}
          gap={4}
        >
          <Textarea
            id="titulo"
            flex={3}
            minH={45}
            maxH={45}
            placeholder="Digite um título para o seu podcast..."
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            backgroundColor="white"
            color="black"
            resize="none"
            height="35px"
            width="full"
          />

          <Textarea
            id="campoTexto"
            flex={3}
            minH={200}
            placeholder="Digite uma descrição para o seu podcast..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            backgroundColor="white"
            color="black"
            resize="none"
            height="150px"
            width="full"
          />

          <Flex
            direction={{ base: "column", sm: "row" }}
            alignItems={{ base: "center", sm: "end" }}
            gap={4}
            flex={2}
          >
            <VStack alignItems={"center"} spacing={2}>
              {/* Exibe a pré-visualização da imagem se houver uma */}
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
                onClick={handleImageButtonClick} // Ação de clique no botão de imagem
              >
                {imageFile
                  ? truncateFileName(imageFile.name, 20)
                  : "Imagem de Capa"}
                {/* Nome da imagem ou texto padrão */}
              </Button>
            </VStack>

            <VStack spacing={2}>
              {/* Exibe a pré-visualização do áudio se houver um */}
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
                {/* Nome do arquivo ou texto padrão */}
              </Button>
            </VStack>
          </Flex>
        </Flex>

        <Button
          id="botaoUpload"
          color="white"
          backgroundColor="#004aad"
          colorScheme="blue"
          width={{ base: "400px" }}
          onClick={sendPodcast}
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