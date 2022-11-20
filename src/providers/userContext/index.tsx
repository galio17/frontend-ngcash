import { createContext } from "react";

import { api } from "../../services";
import {
  ILoginResponse,
  IUser,
  IUserContext,
  IUserProviderProps,
  TLoginFunction,
  TSignUpFunction,
} from "./interfaces";

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: IUserProviderProps) {
  const login: TLoginFunction = async (userData) => {
    try {
      const { data } = await api.post<ILoginResponse>("/login", userData);
      localStorage["@ngcash:token"] = data.token;

      return data.token;
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  const signUp: TSignUpFunction = async (userData) => {
    try {
      const { data } = await api.post<IUser>("/users", userData);
      await login(userData);

      return data;
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  return (
    <UserContext.Provider value={{ login, signUp }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
