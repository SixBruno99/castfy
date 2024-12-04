import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { EpisodeRepository } from "../repositories/episode";
import { IEpisodes, IEpisode } from "../types/episode";
import { SearchEpisodesRepository } from "../repositories/search";
import { useDebounce } from "../utils/debounce";
import { PodcastUploadRepository } from "../repositories/podcast-upload";

interface IValues {
  episode: IEpisode | undefined;
  episodes: IEpisodes[] | undefined;
  favEpisodes: IEpisodes[] | undefined;
  findAll: () => Promise<boolean>;
  findOne: (id: string) => Promise<boolean>;
  addFovorite: (id: string) => Promise<boolean>;
  removeFavorite: (id: string) => Promise<boolean>;
  search: (search: string, categories: string[]) => Promise<void>;
  loading: boolean;
  episodeUpdate: (
    episodeId: string,
    name?: string,
    description?: string,
    categories?: string[]
  ) => Promise<boolean>;
}

export const EpisodeContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function EpisodeProvider({ children }: IProps) {
  const [favEpisodes, setFavEpisodes] = useState<IEpisodes[] | undefined>();
  const [episodes, setEpisodes] = useState<IEpisodes[] | undefined>();
  const [episode, setEpisode] = useState<IEpisode | undefined>();
  const [loading, setLoading] = useState(false);

  const findAll = useCallback(async () => {
    try {
      setLoading(true)
      const data = await EpisodeRepository.findAll();

      if (!data) return false;

      setEpisodes(data);

      return true;
    } catch (error) {
      console.error(`unable to find all due to error: ${error}`);
    } finally {
      setLoading(false)
    }
    return false;
  }, []);

  const findFavorites = useCallback(async () => {
    try {
      setLoading(true)

      const favData = await EpisodeRepository.findAllFav();

      if (!favData) return false;

      setFavEpisodes(favData.favorites);

      return true;
    } catch (error) {
      console.error(`unable to find favorites due to error: ${error}`);
    } finally {
      setLoading(false)
    }
    return false;
  }, []);

  const findOne = useCallback(async (id: string) => {
    try {
      setLoading(true)

      const data = await EpisodeRepository.findOne(id);
      if (!data) return false;
      setEpisode(data);
      return true;
    } catch (error) {
      console.error(`unable to find one due to error: ${error}`);
    } finally {
      setLoading(false)
    }
    return false;
  }, []);

  const addFovorite = async (id: string) => {
    try {
      await EpisodeRepository.addFovorite(id);
      findFavorites();

      return true;
    } catch (error) {
      console.error(`unable to add fovorite due to error: ${error}`);
    }
    return false;
  };

  const removeFavorite = async (id: string) => {
    try {
      await EpisodeRepository.removeFavorite(id);

      setFavEpisodes((prevFavEpisodes) =>
        prevFavEpisodes?.filter((episode) => episode.id !== id)
      );

      return true;
    } catch (error) {
      console.error(`unable to remove fovorite due to error: ${error}`);
    }
    return false;
  };

    const search = useDebounce(async (search: string, categories: string[]) => {
      try {
      setLoading(true)
      const data = await SearchEpisodesRepository.findByCategory(search, categories)

      if (data){
        setEpisodes(data)
      }
    } catch (error){
      console.error(`unable to remove fovorite due to error: ${error}`);
    } finally {
      setLoading(false)
    }
    })

    const episodeUpdate = async (
      episodeId: string,
      title?: string,
      description?: string,
      categories?: string[]
    ) => {
      try {
        const data = await PodcastUploadRepository.episodeUpdate(
          episodeId,
          title,
          description,
          categories
        );
  
        if (!data) return false;
  
        return true;
      } catch (error) {
        console.error(`unable to upload audio due to error: ${error}`);
      }
      return false;
    };
  

  useEffect(() => {
    findAll();
    findFavorites();
  }, []);

  return (
    <EpisodeContext.Provider
      value={{
        episode,
        episodes,
        favEpisodes,
        findAll,
        findOne,
        addFovorite,
        removeFavorite,
        search,
        loading,
        episodeUpdate
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisode() {
  return useContext(EpisodeContext);
}
