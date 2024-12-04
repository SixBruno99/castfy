import {
  Text,
  Box,
  Button,
  Textarea,
  VStack,
  Flex,
  useToast,
  CircularProgress,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useState,  useEffect } from "react";
import { CATEGORIES } from "../../mocks/categories";
import { useNavigate, useParams } from "react-router-dom";
import { useEpisode } from "../../contexts/episode";
import { useUserEpisodes } from "../../contexts/user-episodes";

export function EditEpisode() {
  const toast = useToast();
  const navigate = useNavigate();

  const { id } = useParams();
  const { episode, episodeUpdate, findOne } =
    useEpisode();
  const {getAllUserDataAndEpisodes} = useUserEpisodes()

  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  
  const update = async () => {
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
    

    const uploaded = await episodeUpdate(
      id as string,
      title,
      description,
      [categoryValue]
    );

    if (uploaded) {
      toast({
        title: "Episódio alterado com sucesso!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
      setIsLoading(false);
      getAllUserDataAndEpisodes();
      return navigate(`/profile`);
    }

    setIsLoading(false);

    toast({
      title: "Ocorreu um erro ao editar episódio, tente novamente",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  useEffect(() => {
    findOne(id as string);
  }, [id, findOne]);

  useEffect(() => {
    if(episode){
      setTitle(episode.title as string)
      setDescription(episode.description as string) 
      if(episode.categories && episode.categories.length > 0){
        const episodeCategoryValue = episode.categories[0]
        setCategoryValue(episodeCategoryValue)
        setCategoryLabel(CATEGORIES.find(category => category.value === episodeCategoryValue)?.label ?? '')
      }
    }
    
  }, [episode])

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
          Editar Podcast
        </Text>

        <Text
          marginBottom={8}
          fontSize={{ base: "14px", md: "16px" }}
          color="white"
        >
            Altere os dados do seu Episódio 
          </Text>

        <Flex
          direction={{ base: "column", "2xl": "column" }}
          marginBottom={8}
          alignItems={{ base: "center" }}
          justifyContent="start"
          width="100%"
          gap={4}
        >
          <Image
                src={episode?.imageUrl}
                alt="Preview da Imagem"
                width="350px"
                objectFit="cover"
                borderRadius="md"
                display={{ base: "block", lg: "block" }}
              />
          <Menu>
            <MenuButton
              width={350}
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
        </Flex>

        <Button
          id="botaoUpload"
          color="white"
          backgroundColor="#004aad"
          colorScheme="blue"
          width={{ base: "full" }}
          onClick={update}
          isLoading={isLoading}
        >
          {isLoading ? (
            <CircularProgress isIndeterminate color="white" size="24px" />
          ) : (
            "Confirmar"
          )}
        </Button>
      </VStack>
    </Box>
  );
}
