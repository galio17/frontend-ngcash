import { useState } from "react";

import { useUserContext } from "../../providers";
import FilterTransactions from "./FilterTransactions";
import { IDateRange, TFilterType } from "./interfaces";
import TransactionCard from "./TransactionCard";

function TransactionList() {
  const { user, transactions } = useUserContext();
  const [filterType, setFilterType] = useState<TFilterType>("");
  const [dateRange, setDateRange] = useState<IDateRange>({} as IDateRange);

  const filteredTransactions = transactions?.filter((transactions) => {
    const conditionType = !!filterType
      ? transactions[filterType] === user.username
      : true;

    const date = new Date(transactions.releaseDate);
    const { from, to } = dateRange;
    console.log({ date, from, to });
    const conditionDateFrom = from ? from <= date : true;
    const conditionDateTo = to ? to >= date : true;

    return conditionType && conditionDateFrom && conditionDateTo;
  });

  return (
    <section className="flex-1 flex flex-col gap-2">
      <FilterTransactions
        dateRange={dateRange}
        setDateRange={setDateRange}
        setFilterType={setFilterType}
      />
      <ul className="flex flex-wrap justify-center gap-2 mx-auto">
        {filteredTransactions?.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </section>
  );
}

export default TransactionList;
