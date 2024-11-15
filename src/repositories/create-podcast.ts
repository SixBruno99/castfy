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

      return response.data;
    } catch (error) {
      console.log(`unable to podcast upload due to error: ${error}`);
    }
  },

  podcastUpdate: async (
    episodeId: string,
    name?: string,
    description?: string
  ) => {
    try {
      const payload = {
        episodeId,
        ...(name && { name }), // Adiciona name somente se for fornecido
        ...(description && { description }), // Adiciona description somente se for fornecido
      };

      const response = await http.patch<ICreatePodcast>(
        `/${episodeId}`,
        payload
      );

      return response.data;
    } catch (error) {
      console.log(`unable to update podcast due to error: ${error}`);
    }
  },
};
