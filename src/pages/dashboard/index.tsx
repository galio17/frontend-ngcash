import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { destroyCookie, parseCookies } from "nookies";
import { useEffect } from "react";
import { toast } from "react-toastify";
import TransferForm from "../../components/FormFields/TransferForm";

import Header from "../../components/Header";
import ProfileData from "../../components/ProfileData";
import TransactionList from "../../components/TransactionList";
import { useUserContext } from "../../providers";
import {
  ITransaction,
  ITransferEmit,
  IUser,
} from "../../providers/userContext/interfaces";
import { api } from "../../services/api";
import { socket } from "../../services/websocket";

export const getServerSideProps: GetServerSideProps<{
  userPreload?: IUser;
  transactionsPreload?: ITransaction[];
}> = async (context) => {
  const { "@ngcash:token": token } = parseCookies(context);

  if (token) {
    try {
      const authorization = `Bearer ${token}`;
      api.defaults.headers["Authorization"] = authorization;

      const { data: userPreload } = await api.get<IUser>("/profile");
      const { data: transactionsPreload } = await api.get<ITransaction[]>(
        "/transactions"
      );

      const props = { userPreload, transactionsPreload };

      return { props };
    } catch (err) {
      console.error(err);

      return { redirect: { destination: "/", permanent: false } };
    }
  }
  return { redirect: { destination: "/", permanent: false } };
};
function Dashboard({
  userPreload,
  transactionsPreload,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { getTransaction, user, setUser, transactions, setTransactions } =
    useUserContext();
  const router = useRouter();

  const logout = () => {
    destroyCookie(null, "@ngcash:token");
    router.push("/");
  };

  useEffect(() => {
    if (userPreload) {
      setUser(userPreload);
    }
    if (transactionsPreload) {
      setTransactions(transactionsPreload);
    }
  }, []);

  useEffect(() => {
    socket.on(
      "transferTransaction",
      async ({ to, transactionId }: ITransferEmit) => {
        if (user.username === to) {
          toast.info("Você recebeu uma nova transferência");
          const transaction = await getTransaction(transactionId);

          setTransactions([transaction, ...transactions]);
          setUser({ ...user, balance: user.balance + transaction.value });
        }
      }
    );

    return () => {
      socket.off("transferTransaction");
    };
  }, []);

  return (
    <div className="page">
      <Header>
        <button type="submit" className="btn" onClick={logout}>
          Sair
        </button>
      </Header>
      <main className="flex-1 py-3 px-5 flex">
        <div className="container mx-auto flex flex-col sm:flex-row justify-around gap-4 relative">
          <section className="h-max flex flex-col justify-center gap-4 sm:sticky sm:top-[calc(50%+80px)] sm:-translate-y-1/2">
            <ProfileData />
            <TransferForm />
          </section>
          <TransactionList />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
