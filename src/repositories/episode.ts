import { http } from "../services/http";
import { IEpisodes, IEpisode } from "../types/episode";

export const EpisodeRepository = {
  findAll: async () => {
    try {
      const response = await http.get<IEpisodes[]>("/episode");

      return response.data;
    } catch (error) {
      console.log(`unable to findAll due to error: ${error}`);
    }
  },

  findOne: async (id: string) => {
    try {
      const response = await http.get<IEpisode>(`/episode/${id}`);

      return response.data;
    } catch (error) {
      console.log(`unable to findOne due to error: ${error}`);
    }
  },
};
