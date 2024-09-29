import { ReactNode, createContext, useContext } from "react";
import { CreatePodcastRepository } from "../repositories/create-podcast";
import { ICreatePodcast } from "../types/create-podcast";

interface IValues {
  createPodcast: (payload: ICreatePodcast) => Promise<boolean>;
}

export const CreatePodcastContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function CreatePodcastProvider({ children }: IProps) {
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
