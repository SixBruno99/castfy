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

interface IValues {
  episode: IEpisode | undefined;
  episodes: IEpisodes[] | undefined;
  favEpisodes: IEpisodes[] | undefined;
  findAll: () => Promise<boolean>;
  findOne: (id: string) => Promise<boolean>;
}

export const EpisodeContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function EpisodeProvider({ children }: IProps) {
  const [favEpisodes, setFavEpisodes] = useState<IEpisodes[] | undefined>();
  const [episodes, setEpisodes] = useState<IEpisodes[] | undefined>();
  const [episode, setEpisode] = useState<IEpisode | undefined>();

  const findAll = useCallback(async () => {
    try {
      const data = await EpisodeRepository.findAll();
      const favData = await EpisodeRepository.findAllFav();
      
      if (!data) return false;
      if (!favData) return false;

      setEpisodes(data);
      setFavEpisodes(favData.lastEpisodes);

      return true;
    } catch (error) {
      console.error(`unable to login due to error: ${error}`);
    }
    return false;
  }, []);

  const findOne = useCallback(async (id: string) => {
    try {
      const data = await EpisodeRepository.findOne(id);
      if (!data) return false;
      setEpisode(data);
      return true;
    } catch (error) {
      console.error(`unable to login due to error: ${error}`);
    }
    return false;
  }, []);

  useEffect(() => {
    findAll();
  }, []);

  return (
    <EpisodeContext.Provider
      value={{
        episode,
        episodes,
        favEpisodes,
        findAll,
        findOne,
      }}
    >
      {children}
    </EpisodeContext.Provider>
  );
}

export function useEpisode() {
  return useContext(EpisodeContext);
}
