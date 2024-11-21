import { http } from "../services/http";
import { IAudioUpload, IPodcastUpload } from "../types/podcast-upload";

export const PodcastUploadRepository = {
  audioUpload: async ({ audio }: IAudioUpload) => {
    try {
      const audioData = new FormData();
      audioData.append("audio", audio);

      const response = await http.post("/episode/audio", audioData);
      return response.data;
    } catch (error) {
      console.log(`unable to upload audio due to error: ${error}`);
    }
  },

  podcastUpload: async ({
    fileId,
    title,
    description,
    categories,
    image,
  }: IPodcastUpload) => {
    try {
      const episodeData = new FormData();
      episodeData.append("fileId", fileId);
      episodeData.append("title", title);
      episodeData.append("description", description);
      episodeData.append("image", image);
      episodeData.append("categories", JSON.stringify(categories));

      const response = await http.post<IPodcastUpload>(`/episode`, episodeData);

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },

  episodeUpdate: async (
    episodeId: string,
    title?: string,
    description?: string
  ) => {
    try {
      const payload = {
        episodeId,
        ...(title && { title }), // Adiciona name somente se for fornecido
        ...(description && { description }), // Adiciona description somente se for fornecido
      };

      const response = await http.patch<IPodcastUpload>(
        `/${episodeId}`,
        payload
      );

      return response.data;
    } catch (error) {
      console.log(`unable to update podcast due to error: ${error}`);
    }
  },
};
