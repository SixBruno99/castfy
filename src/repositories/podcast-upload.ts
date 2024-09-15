import { http } from "../services/http";
import { IAudioUpload, IPodcastUpload } from "../types/podcast-upload";

export const PodcastRepository = {
  audioUpload: async ({ audio }: IAudioUpload) => {
    try {
      const formData = new FormData();
      formData.append("audio", audio);

      const response = await http.post("/episode/audio", formData);

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
      const formData = new FormData();

      formData.append("fileId", fileId);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      console.log("params", fileId);
      console.log("params", title);
      console.log("params", description);
      console.log("params", image);

      console.log(
        "podcast form data",
        formData.append("fileId", fileId),
        formData.append("title", title),
        formData.append("description", description),
        formData.append("image", image)
      );

      const response = await http.post<IPodcastUpload>(`/episode`, formData);

      console.log("episode", { response });

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },
};
