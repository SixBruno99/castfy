import { http } from "../services/http";
import { IEpisode } from "../types/episode";

export const LibraryRepository = {
  findOne: async (id: string) => {
    try {
      const response = await http.get<IEpisode>(`/episode/${id}`);

      return response.data;
    } catch (error) {
      console.log(`unable to findOne due to error: ${error}`);
    }
  },
};
