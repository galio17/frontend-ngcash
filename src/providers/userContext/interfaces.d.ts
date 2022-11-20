import { ReactNode } from "react";

export interface IUser {
  id: string;
  username: string;
  balance: number;
}

export interface IUserRequest extends Pick<IUser, "username"> {
  password: string;
}

export interface ILoginResponse {
  token: string;
}

type TLoginFunction = (data: IUserRequest) => Promise<string | void>;

export interface IUserContext {
  loginUser: TLoginFunction;
}

export interface IUserProviderProps {
  children: ReactNode;
}
