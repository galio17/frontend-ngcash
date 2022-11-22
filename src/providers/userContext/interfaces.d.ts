import { Dispatch, ReactNode, SetStateAction } from "react";

interface IUserRequest {
  username: string;
  password: string;
}

interface IUser extends Omit<IUserRequest, "password"> {
  id: string;
  balance: number;
}

interface ILoginResponse {
  token: string;
}

type TLoginFunction = (data: IUserRequest) => Promise<string>;

type TSignUpFunction = (data: IUserRequest) => Promise<IUser>;

interface ITransferRequest {
  to: string;
  value: number;
}

interface ITransaction extends ITransferRequest {
  id: string;
  from: string;
  releaseDate: string;
}

interface ITransferEmit extends Pick<ITransferRequest, "to"> {
  transactionId: string;
}

type TTransferFunction = (data: ITransferRequest) => Promise<ITransaction>;

type TGetTransaction = (transactionId: string) => Promise<ITransaction>;

interface IUserContext {
  login: TLoginFunction;
  signUp: TSignUpFunction;
  transfer: TTransferFunction;
  getTransaction: TGetTransaction;
  transactions: ITransaction[];
  setTransactions: Dispatch<SetStateAction<ITransaction[]>>;
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
}

interface IUserProviderProps {
  children: ReactNode;
}
