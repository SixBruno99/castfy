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
    category,
    image,
  }: IPodcastUpload) => {
    try {
      const episodeData = new FormData();
      episodeData.append("fileId", fileId);
      episodeData.append("title", title);
      episodeData.append("description", description);
      episodeData.append("image", image);
      episodeData.append("category", JSON.stringify(category));

      const response = await http.post<IPodcastUpload>(`/episode`, episodeData);

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },
};
