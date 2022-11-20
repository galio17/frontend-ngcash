import { createContext } from "react";

import { api } from "../../services";
import {
  ILoginResponse,
  IUserContext,
  IUserProviderProps,
  TLoginFunction,
} from "./interfaces";

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: IUserProviderProps) {
  const loginUser: TLoginFunction = async (userData) => {
    try {
      const { data } = await api.post<ILoginResponse>("/login", userData);
      localStorage["@ngcash:token"] = data.token;

      return data.token;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider value={{ loginUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
