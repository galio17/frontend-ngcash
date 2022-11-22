import { Dispatch, SetStateAction } from "react";
import { ITransaction } from "../../providers/userContext/interfaces";

type TFilterType = "to" | "from" | "";

interface IDateRange {
  from: Date;
  to: Date;
}

interface IFilterTransactionsProps {
  dateRange: IDateRange;
  setDateRange: Dispatch<SetStateAction<IDateRange>>;
  setFilterType: Dispatch<SetStateAction<TFilterType>>;
}

interface ITransactionCardProps {
  transaction: ITransaction;
}
