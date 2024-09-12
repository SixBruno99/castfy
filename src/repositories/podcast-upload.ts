import { http } from "../services/http";
import { IAudioUpload, IPodcastUpload } from "../types/podcast-upload";

export const PodcastRepository = {
  audioUpload: async ({ audio }: IAudioUpload) => {
    try {
      const response = await http.post<IPodcastUpload>("/episode", { audio });

      return response.data;
    } catch (error) {
      console.log(`unable to upload audio due to error: ${error}`);
    }
  },

  podcastUpload: async ({ id, title, description, image }: IPodcastUpload) => {
    try {
      const response = await http.post<IAudioUpload>(`/episode/audio`, {
        id,
        title,
        description,
        image,
      });

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },
};
