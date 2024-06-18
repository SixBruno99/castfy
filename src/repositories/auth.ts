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
        "/auth/sign-in",
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
        "/auth/sign-up",
        payload
      );
      return response.data;
    } catch (error) {
      console.log(`unable to register due to error: ${error}`);
    }
  },

  sendEmail: async (email: string) => {
    try {
      const response = await http.post("/auth/forgot-password", { email });

      return response.data;
    } catch (error) {
      console.log(`unable to send email due to error: ${error}`);
    }
  },

  sendCode: async (id: string, code: string) => {
    try {
      const response = await http.post(`/auth/verify-code/${id}/${code}`, {
        code,
      });
      return response.data;
    } catch (error) {
      console.log(`unable to send code due to error: ${error}`);
    }
  },

  sendPassword: async (authToken: string, password: string) => {
    
    try {
      const response = await http.post(
        "/auth/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(`unable to send password due to error: ${error}`);
    }
  },
};
