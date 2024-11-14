import { ReactNode, createContext, useContext } from "react";
import { PodcastUploadRepository } from "../repositories/podcast-upload";
import { IPodcastUpload, IAudioUpload } from "../types/podcast-upload";

interface IValues {
  audioUpload: (
    payload: IAudioUpload & Omit<IPodcastUpload, "fileId">
  ) => Promise<boolean>;
  podcastUpload: (payload: IPodcastUpload) => Promise<boolean>;
  podcastUpdate: (
    podcastId: string,
    name?: string,
    description?: string
  ) => Promise<boolean>;
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
    category,
    image,
  }: IAudioUpload & Omit<IPodcastUpload, "fileId">) => {
    try {
      const data = await PodcastUploadRepository.audioUpload({ audio });

      if (!data) return false;

      const fileId = data.id;

      podcastUpload({ fileId, title, description, category, image });

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
    category,
    image,
  }: IPodcastUpload) => {
    try {
      const data = await PodcastUploadRepository.podcastUpload({
        fileId,
        title,
        description,
        category,
        image,
      });

      if (!data) return false;

      return true;
    } catch (error) {
      console.error(`unable to upload audio due to error: ${error}`);
    }
    return false;
  };

  const podcastUpdate = async (
    podcastId: string,
    name?: string,
    description?: string
  ) => {
    try {
      const data = await PodcastUploadRepository.podcastUpdate(
        podcastId,
        name,
        description
      );

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
        podcastUpdate,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
}

export function usePodcast() {
  return useContext(PodcastContext);
}
