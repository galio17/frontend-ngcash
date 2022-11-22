import { createContext, useState } from "react";

import { parseCookies, setCookie } from "nookies";

import { api } from "../../services/api";
import { socket } from "../../services/websocket";
import {
  ILoginResponse,
  ITransaction,
  IUser,
  IUserContext,
  IUserProviderProps,
  TGetTransaction,
  TLoginFunction,
  TSignUpFunction,
  TTransferFunction,
} from "./interfaces";

export const UserContext = createContext<IUserContext>({} as IUserContext);

function UserProvider({ children }: IUserProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const login: TLoginFunction = async (userData) => {
    try {
      const { data } = await api.post<ILoginResponse>("/login", userData);
      api.defaults.headers["Authorization"] = data.token;
      setCookie(null, "@ngcash:token", data.token, {
        maxAge: 60 * 60 * 24,
        path: "/",
      });

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

  const transfer: TTransferFunction = async (transferData) => {
    try {
      const { "@ngcash:token": token } = parseCookies();
      const authorization = `Bearer ${token}`;
      api.defaults.headers["Authorization"] = authorization;

      const { data } = await api.post<ITransaction>(
        "/transactions/transfer",
        transferData
      );

      setTransactions([data, ...transactions]);
      setUser({ ...user, balance: user.balance - data.value });

      const { to, id: transactionId } = data;
      socket.emit("transferTransaction", { to, transactionId });

      return data;
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  const getTransaction: TGetTransaction = async (id) => {
    try {
      const { "@ngcash:token": token } = parseCookies();
      const authorization = `Bearer ${token}`;
      api.defaults.headers["Authorization"] = authorization;

      const { data } = await api.get<ITransaction>(`/transactions/${id}`);

      return data;
    } catch (err) {
      console.error(err);

      throw err;
    }
  };

  return (
    <UserContext.Provider
      value={{
        login,
        signUp,
        transfer,
        getTransaction,
        user,
        setUser,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
