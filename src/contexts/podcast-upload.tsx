import { ReactNode, createContext, useContext, useState } from "react";
import { PodcastRepository } from "../repositories/podcast-upload";
import { IPodcastUpload, IAudioUpload } from "../types/podcast-upload";

interface IValues {
  fileId: string;
  audioUpload: (payload: IAudioUpload) => Promise<boolean>;
  podcastUpload: (payload: Omit<IPodcastUpload, 'fileId'>) => Promise<boolean>;
}

export const PodcastContext = createContext<IValues>({} as IValues);

interface IProps {
  children: ReactNode;
}

export function PodcastProvider({ children }: IProps) {
  const [fileId, setFileId] = useState<string>('');

  const audioUpload = async ({ audio }: IAudioUpload) => {
    try {
      const data = await PodcastRepository.audioUpload({ audio });

      if (!data) return false;

      setFileId(data.id);

      return true;
    } catch (error) {
      console.error(`unable to upload audio due to error: ${error}`);
    }
    return false;
  };

  const podcastUpload = async ({
    title,
    description,
    image,
  }: Omit<IPodcastUpload, 'fileId'>) => {
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
        fileId,
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
