import { render, screen } from "@testing-library/react";
import { Home } from "./home";
import { useEpisode } from "../../contexts/episode";
import { describe, it, expect, vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { MemoryRouter } from "react-router-dom";
import { IEpisodes } from "../../types/episode";

vi.mock("../../contexts/episode", () => ({
  useEpisode: vi.fn(),
}));

describe("Home Component", () => {
  const mockUseEpisode = () => {
    return {
      episodes: [],
      episode: undefined,
      favEpisodes: undefined,
      findAll: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
      },
      findOne: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
      },
      addFovorite: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
      },
      removeFavorite: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
      },
    };
  };

  beforeEach(() => {
    // Reseta o mock antes de cada teste
    vi.mocked(useEpisode).mockReturnValue(mockUseEpisode());
  });

  it("Deve renderizar o título corretamente", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Verificar se o título "Para você:" está presente
    const title = screen.getByText(/Para você:/i);
    expect(title).toBeInTheDocument();
  });

  it("Deve renderizar a lista de episódios corretamente", () => {
    // Mock para simular episódios
    const mockEpisodes: IEpisodes[] = [
      { id: "1", title: "Primeiro Episódio", image: { url: "image1.jpg" } },
      { id: "2", title: "Segundo Episódio", image: { url: "image2.jpg" } },
    ];

    vi.mocked(useEpisode).mockReturnValue({
      ...mockUseEpisode(), // Mantém as funções mockadas
      episodes: mockEpisodes, // Passa os episódios mockados para este teste
    });

    render(
      <ChakraProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Verificar se os episódios foram renderizados
    mockEpisodes.forEach((episode) => {
      const episodeTitle = screen.getByText(episode.title);
      expect(episodeTitle).toBeInTheDocument();
    });
  });

  it("Deve renderizar corretamente quando não houver episódios", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Verificar se não há episódios renderizados
    const episodes = screen.queryAllByTestId("episode");
    expect(episodes).toHaveLength(0);
  });
});
