import { ReactNode } from "react";

interface IUser {
  id: string;
  username: string;
  balance: number;
}

interface IUserRequest extends Pick<IUser, "username"> {
  password: string;
}

interface ILoginResponse {
  token: string;
}

type TLoginFunction = (data: IUserRequest) => Promise<string | void>;

type TSignUpFunction = (data: IUserRequest) => Promise<IUser | void>;

interface IUserContext {
  login: TLoginFunction;
  signUp: TSignUpFunction;
}

interface IUserProviderProps {
  children: ReactNode;
}
