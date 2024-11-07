import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { UserEpisodesRepository } from "../repositories/user-episodes";
import { IUserData, IUserEpisodes } from "../types/user-episodes";
import { useToast } from "@chakra-ui/react";

interface IValues {
  userData: IUserData | undefined;
  userEpisodes: IUserEpisodes[] | undefined;
  getAllUserDataandEpisodes: () => Promise<boolean>;
  removeEpisode: (id: string) => Promise<boolean>;
}

export const UserEpisodesContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function UserEpisodesProvider({ children }: IProps) {
  const [userData, setUserData] = useState<IUserData | undefined>();
  const [userEpisodes, setUserEpisodes] = useState<
    IUserEpisodes[] | undefined
  >();
  const toast = useToast();

  const getAllUserDataandEpisodes = useCallback(async () => {
    try {
      const data = await UserEpisodesRepository.findAll();

      if (!data) return false;

      setUserData(data);
      setUserEpisodes(data.episodes);

      return true;
    } catch (error) {
      console.error(`unable to getAllUserEpisodes due to error: ${error}`);
    }
    return false;
  }, []);

  const removeEpisode = async (id: string) => {
    try {
      const data = await UserEpisodesRepository.removeEpisode(id);

      if (!data) return false;

      setUserEpisodes((prevEpisodes) =>
        prevEpisodes?.filter((episode) => episode.id !== id)
      );

      console.log("removeEpisode", data)

      toast({
        title: "Episódio deletado permanentemente",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      return true;
    } catch (error) {
      console.error(`unable to removeEpisode due to error: ${error}`);
    }
    return false;
  }

  useEffect(() => {
    getAllUserDataandEpisodes();
  }, []);

  return (
    <UserEpisodesContext.Provider
      value={{
        userData,
        userEpisodes,
        getAllUserDataandEpisodes,
        removeEpisode
      }}
    >
      {children}
    </UserEpisodesContext.Provider>
  );
}

export function useUserEpisodes() {
  return useContext(UserEpisodesContext);
}
