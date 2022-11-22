import Image from "next/image";
import { useUserContext } from "../../../providers";
import { ITransactionCardProps } from "../interfaces";

function TransactionCard({ transaction }: ITransactionCardProps) {
  const { user } = useUserContext();

  const { from, to, value, releaseDate } = transaction;

  const isCashIn = to === user.username;

  const typeStyle = isCashIn ? "text-secondary" : "text-alert";
  const type = isCashIn ? "Entrada" : "Saída";
  const name = isCashIn ? from : to;
  const date = new Date(releaseDate).toLocaleString("pt-br", {
    dateStyle: "short",
    timeStyle: "short",
  });
  const cash = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <li className="card">
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
        <div className="flex gap-3 justify-between items-center">
          <h4 className="font-semibold">Nome:</h4>
          <strong className="font-medium">{name}</strong>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <h4 className="font-semibold">Data:</h4>
          <strong className="font-medium">{date}</strong>
        </div>
        <div className="flex gap-3 justify-between items-center">
          <h4 className="font-semibold">Valor:</h4>
          <strong className="font-medium">{cash}</strong>
        </div>
      </section>
    </li>
  );
}

export default TransactionCard;
