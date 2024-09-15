import { ReactNode, createContext, useContext } from "react";
import { PodcastRepository } from "../repositories/podcast-upload";
import { IPodcastUpload, IAudioUpload } from "../types/podcast-upload";

interface IValues {
  audioUpload: (payload: IAudioUpload & Omit<IPodcastUpload, "fileId">) => Promise<boolean>;
  podcastUpload: (payload: IPodcastUpload) => Promise<boolean>;
}

export const PodcastContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function PodcastProvider({ children }: IProps) {
  const audioUpload = async ({
    audio,
    title,
    description,
    image,
  }: IAudioUpload & Omit<IPodcastUpload, "fileId">) => {
    try {
      const data = await PodcastRepository.audioUpload({ audio });

      if (!data) return false;

      const fileId = data.id

      podcastUpload({ fileId, title, description, image });

      return true;
    } catch (error) {
      console.error(`unable to upload audio due to error: ${error}`);
    }
    return false;
  };

  const podcastUpload = async ({
    fileId,
    title,
    description,
    image,
  }: IPodcastUpload) => {
    try {
      const data = await PodcastRepository.podcastUpload({
        fileId,
        title,
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
    <PodcastContext.Provider
      value={{
        audioUpload,
        podcastUpload,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcast() {
  return useContext(PodcastContext);
}
