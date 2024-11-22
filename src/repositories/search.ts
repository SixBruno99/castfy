import { http } from "../services/http";

export const SearchEpisodesRepository = {
  findByName: async (search: string) => {
    try {
      const response = await http.get(`/search/${search}`);

      return response.data;
    } catch (error) {
      console.log(`unable to findByName due to error: ${error}`);
    }
  },

  findByCategory: async (search: string, categories: string) => {
    try {
      const response = await http.get(`/search/${search}?categories=${categories}`);

      return response.data;
    } catch (error) {
      console.log(`unable to findByCategory due to error: ${error}`);
    }
  },
};
