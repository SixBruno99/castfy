import { ReactNode, createContext, useContext } from "react";
import { CreatePodcastRepository } from "../repositories/create-podcast";
import { ICreatePodcast } from "../types/create-podcast";
import { useAuth } from "./auth";

interface IValues {
  createPodcast: (payload: ICreatePodcast) => Promise<boolean>;
}

export const CreatePodcastContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function CreatePodcastProvider({ children }: IProps) {
  const { updateUserHasPodcast } = useAuth();

  const createPodcast = async ({
    name,
    description,
    image,
  }: ICreatePodcast) => {
    try {
      const data = await CreatePodcastRepository.createPodcast({
        name,
        description,
        image,
      });

      if (!data) return false;

      updateUserHasPodcast(true);

      // verifica se os dados estão armazenados no localStorage
      const local = localStorage.getItem("@auth:token");
      if (local) localStorage.setItem("userHasPodcast", String(true));
      
      // verifica se os dados estão armazenados no sessionStorage
      const session = sessionStorage.getItem("@auth:token");
      if (session) localStorage.setItem("userHasPodcast", String(true));

      return true;
    } catch (error) {
      console.error(`unable to upload audio due to error: ${error}`);
    }
    return false;
  };

  return (
    <CreatePodcastContext.Provider
      value={{
        createPodcast,
      }}
    >
      {children}
    </CreatePodcastContext.Provider>
  );
}

export function useCreatePodcast() {
  return useContext(CreatePodcastContext);
}
