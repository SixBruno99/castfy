import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { EpisodeRepository } from "../repositories/episode";
import { IEpisodes, IEpisode } from "../types/episode";

interface IValues {
  episodes: IEpisodes[] | undefined;
  episode: IEpisode | undefined;
  findAll: () => Promise<boolean>;
  findOne: (id: string) => Promise<boolean>;
}

export const EpisodeContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function EpisodeProvider({ children }: IProps) {
  const [episodes, setEpisodes] = useState<IEpisodes[] | undefined>(undefined);
  const [episode, setEpisode] = useState<IEpisode | undefined>(undefined);

  async function findAll() {
    try {
      const data = await EpisodeRepository.findAll();

      if (!data) return false;

      setEpisodes(data);

      return true;
    } catch (error) {
      console.error(`unable to login due to error: ${error}`);
    }

    return false;
  }

  async function findOne(id: string) {
    try {
      const data = await EpisodeRepository.findOne(id);

      if (!data) return false;

      setEpisode(data);

      return true;
    } catch (error) {
      console.error(`unable to login due to error: ${error}`);
    }

    return false;
  }

  useEffect(() => {
    findAll();
  }, []);

  return (
    <EpisodeContext.Provider
      value={{
        episodes,
        episode,
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
