import { http } from "../services/http";
import { IAudioUpload, IPodcastUpload } from "../types/podcast-upload";

export const PodcastRepository = {
  audioUpload: async ({ audio }: IAudioUpload) => {
    try {
      const formData = new FormData();
      formData.append("audio", audio);

      formData.append("fileId", "1");
      formData.append("title", "Reflections");
      formData.append("description", "Reflections - The neighbourhood");

      const response = await http.post("/episode", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log({response});

      return response.data;
    } catch (error) {
      console.log(`unable to upload audio due to error: ${error}`);
    }
  },

  podcastUpload: async ({ id, title, description, image }: IPodcastUpload) => {
    try {
      const response = await http.post<IPodcastUpload>(`/episode/audio`, {
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
