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

interface IValues {
  userData: IUserData | undefined;
  userEpisodes: IUserEpisodes[] | undefined;
  getAllUserEpisodes: () => Promise<boolean>;
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

  const getAllUserEpisodes = useCallback(async () => {
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

  useEffect(() => {
    getAllUserEpisodes();
  }, []);

  return (
    <UserEpisodesContext.Provider
      value={{
        userData,
        userEpisodes,
        getAllUserEpisodes,
      }}
    >
      {children}
    </UserEpisodesContext.Provider>
  );
}

export function useUserEpisodes() {
  return useContext(UserEpisodesContext);
}
