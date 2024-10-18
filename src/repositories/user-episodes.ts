import { http } from "../services/http";
import { IUserData} from "../types/user-episodes";

export const UserEpisodesRepository = {
  findAll: async () => {
    try {
      const response = await http.get<IUserData>("/podcast");

      console.log({ response });

      return response.data;
    } catch (error) {
      console.log(`unable to findAll due to error: ${error}`);
    }
  },
};
