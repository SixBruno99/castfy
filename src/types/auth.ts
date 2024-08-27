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
    id: string;
    email: string;
    name: string;
    token: string;
  };
  // data: {
  //   token: string;
  //   user: IUser;
  // };
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
}

export type TGender = EGender.MALE | EGender.FEMALE;
