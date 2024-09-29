import { http } from "../services/http";
import { ICreatePodcast } from "../types/create-podcast";

export const CreatePodcastRepository = {
  createPodcast: async ({
    name,
    description,
    image,
  }: ICreatePodcast) => {
    try {
      const episodeData = new FormData();
      episodeData.append("name", name);
      episodeData.append("description", description);
      episodeData.append("image", image);

      const response = await http.post<ICreatePodcast>(`/podcast`, episodeData);

      console.log("create podcast", { response });

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },
};
