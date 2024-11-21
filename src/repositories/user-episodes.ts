import { http } from "../services/http";
import { IEpisode } from "../types/episode";
import { IUserData } from "../types/user-episodes";

export const UserEpisodesRepository = {
  findAll: async () => {
    try {
      const response = await http.get<IUserData>("/podcast");

      return response.data;
    } catch (error) {
      console.log(`unable to findAll due to error: ${error}`);
    }
  },

  removeEpisode: async (id: string) => {
    try {
      const response = await http.delete<IEpisode>(`/episode/${id}`);

      if (response.status === 204) return true;

      return false;
    } catch (error) {
      console.log(`unable to remove episode due to error: ${error}`);
      return false;
    }
  },
};
