export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: TGender;
  birthDate: Date;
}

export interface ISignInPayload {
  email: string;
  password: string;
}

export interface ISignInResponse {
  data: {
    token: string;
    user: IUser;
  };
}

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
  gender: TGender;
  birthDate: Date;
}

export interface ISignUpResponse {
  data: {
    token: string;
    user: Omit<IUser, "password">;
  };
}

export enum EGender {
  MALE = "MALE",
  FEMALE = "FEMALE ",
  NON_BINARY = "NON_BINARY",
}

export type TGender = EGender.MALE | EGender.FEMALE | EGender.NON_BINARY;
