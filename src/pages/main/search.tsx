import {
  Box,
  Input,
  Text,
  Grid,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { Episode } from "../../core/components/episode";
import { useEpisode } from "../../contexts/episode";
import { CATEGORIES } from "../../mocks/categories";
import { FaChevronDown } from "react-icons/fa";

export function Search() {
  const { episodes } = useEpisode();
  const [search, setSearch] = useState("");
  const [categoryValue, setCategoryValue] = useState<string>();
  const [categoryLabel, setCategoryLabel] = useState<string>(
    "Selecione uma categoria"
  );

  console.log("search category", categoryValue);

  const filteredEpisodes = episodes?.filter((episode) =>
    episode.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectCategory = (category: string) => {
    setCategoryLabel(category);
  };

  return (
    <Box
      height="100%"
      width="100%"
      overflow="hidden"
      backgroundColor="#1f1f1f"
      padding={{ base: "12px", md: "24px" }}
      minHeight={{ base: "calc(100vh - 64px)", md: "100vh" }}
    >
      <Flex
        gap={4}
        width={{ base: "264px", md: "700px" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Input
          width="100%"
          maxWidth="c"
          color="white"
          value={search}
          placeholder="Pesquisar..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <Menu>
          <MenuButton
            as={Button}
            width="100%"
            maxWidth="350px"
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
      </Flex>

      <Box
        height="calc(100vh - 64px)"
        overflow="auto"
        display={{ base: "flex", md: "block" }}
        justifyContent="center"
        marginTop="64px"
      >
        {filteredEpisodes?.length ? (
          <Grid
            gap={4}
            marginY={4}
            pb={{ base: 0, md: 8 }}
            templateColumns="repeat(auto-fill, minmax(232px, 1fr))"
          >
            {filteredEpisodes?.map((episode, idx) => (
              <Episode
                key={idx}
                id={episode.id}
                title={episode.title}
                image={episode.image}
                showFavorite={false}
              />
            ))}
          </Grid>
        ) : (
          <Text
            marginTop={40}
            color="white"
            fontWeight="bold"
            textAlign="center"
            fontSize={40}
          >
            Opss... Podcast não encontrado
          </Text>
        )}
      </Box>
    </Box>
  );
}
