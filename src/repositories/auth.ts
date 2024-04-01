import { http } from "../services/http";
import {
  ISignInPayload,
  ISignInResponse,
  ISignUpPayload,
  ISignUpResponse,
} from "../types/auth";

export const AuthRepository = {
  signIn: async (payload: ISignInPayload) => {
    try {
      const response = await http.post<ISignInPayload, ISignInResponse>(
        "/sign-in",
        payload
      );

      return response.data;
    } catch (error) {
      console.log(`unable to login due to error: ${error}`);
    }
  },

  signUp: async (payload: ISignUpPayload) => {
    try {
      const response = await http.post<ISignUpPayload, ISignUpResponse>(
        "/sign-up",
        payload
      );
      return response.data;
    } catch (error) {
      console.log(`unable to register due to error: ${error}`);
    }
  },
};
