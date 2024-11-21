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
  getAllUserDataAndEpisodes: () => Promise<boolean>;
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

  const getAllUserDataAndEpisodes = useCallback(async () => {
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
      const success  = await UserEpisodesRepository.removeEpisode(id);

      if (!success) {
        toast({
          title: "Erro ao tentar apagar epsódio",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        return false;
      }

      setUserEpisodes((prevEpisodes) =>
        prevEpisodes?.filter((episode) => episode.id !== id)
      );

      console.log("removeEpisode", success);

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
  };

  useEffect(() => {
    getAllUserDataAndEpisodes();
  }, []);

  return (
    <UserEpisodesContext.Provider
      value={{
        userData,
        userEpisodes,
        getAllUserDataAndEpisodes,
        removeEpisode,
      }}
    >
      {children}
    </UserEpisodesContext.Provider>
  );
}

export function useUserEpisodes() {
  return useContext(UserEpisodesContext);
}
