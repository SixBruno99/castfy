import { http } from "../services/http";
import { IAudioUpload, IPodcastUpload } from "../types/podcast-upload";

export const PodcastRepository = {
  audioUpload: async ({ audio }: IAudioUpload) => {
    try {
      const audioData = new FormData();
      audioData.append("audio", audio);

      const response = await http.post("/episode/audio", audioData);

      console.log("audio", { response });

      return response.data;
    } catch (error) {
      console.log(`unable to upload audio due to error: ${error}`);
    }
  },

  podcastUpload: async ({
    fileId,
    title,
    description,
    image,
  }: IPodcastUpload) => {
    try {
      console.log("fileId", fileId);
      console.log("title", title);
      console.log("description", description);
      console.log("image", image);
      const episodeData = new FormData();
      episodeData.append("fileId", fileId);
      episodeData.append("title", title);
      episodeData.append("description", description);
      episodeData.append("image", image);

      const response = await http.post<IPodcastUpload>(`/episode`, episodeData);

      console.log("episode", { response });

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },
};
