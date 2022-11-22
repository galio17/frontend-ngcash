import Image from "next/image";
import { useThemeContext, useUserContext } from "../../../providers";
import { ITransactionCardProps } from "./interfaces";

function TransactionCard({ transaction }: ITransactionCardProps) {
  const { user } = useUserContext();
  const { isDark } = useThemeContext();

  const { from, to, value, releaseDate } = transaction;

  const isCashIn = to === user.username;

  const typeStyle = isCashIn ? "text-secondary" : "text-alert";
  const type = isCashIn ? "Entrada" : "Saída";
  const name = isCashIn ? from : to;
  const date = new Date(releaseDate).toLocaleDateString();
  const cash = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <li
      className="
      flex-1 flex flex-col rounded-lg border border-primary gap-4 min-w-[12.5rem]
      bg-grey-0 dark:bg-grey-2 text-grey-2 dark:text-grey-0 p-3 first:min-w-full
    "
    >
      <div className="flex items-stretch gap-2">
        <Image
          src="/logo_ng_cash-redux.png"
          alt="logo"
          width={40}
          height={40}
        />
        <div className="flex-1 flex flex-col">
          <h3 className="font-semibold">Histórico</h3>
          <em className={`font-medium ${typeStyle}`}>{type}</em>
        </div>
      </div>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Nome:</h4>
          <strong className="font-medium">{name}</strong>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Data:</h4>
          <strong className="font-medium">{date}</strong>
        </div>
        <div className="flex justify-between items-center">
          <h4 className="font-semibold">Valor:</h4>
          <strong className="font-medium">{cash}</strong>
        </div>
      </section>
    </li>
  );
}

export default TransactionCard;
