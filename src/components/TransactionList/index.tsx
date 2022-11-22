import { useUserContext } from "../../providers";
import TransactionCard from "./TransactionCard";

function TransactionList() {
  const { transactions } = useUserContext();

  return (
    <section className="flex-1">
      <ul className="flex flex-wrap justify-between gap-2">
        {transactions?.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </section>
  );
}

export default TransactionList;
