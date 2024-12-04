import { http } from "../services/http";
import type { IEpisodes } from "../types/episode";

export const SearchEpisodesRepository = {
  findByName: async (search: string) => {
    try {
      const response = await http.get(`/search/${search}`);

      return response.data;
    } catch (error) {
      console.log(`unable to findByName due to error: ${error}`);
    }
  },

  findByCategory: async (search: string, categories: string[]) => {
    try {
      let request = `episode/search?search=${search}`;
      

       for (const element of categories) {
        if(element !== null && element !== '')
          request = request.concat(`&categories=${element}`
        )
      }

      const response = await http.get<IEpisodes[]>(request);

      return response.data;
    } catch (error) {
      console.log(`unable to findByCategory due to error: ${error}`);
    }
  },
};
