import * as Toggle from "@radix-ui/react-toggle-group";
import { ChangeEventHandler, useRef } from "react";
import {
  IDateRange,
  IFilterTransactionsProps,
  TFilterType,
} from "../interfaces";

function FilterTransactions({
  dateRange,
  setDateRange,
  setFilterType,
}: IFilterTransactionsProps) {
  const dateFromRef = useRef<HTMLInputElement>(null);
  const dateToRef = useRef<HTMLInputElement>(null);

  const handlerToggleChange = (value: TFilterType) => {
    setFilterType(value);
  };

  const handlerDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, value } = event.target;

    dateRange[id as keyof IDateRange] = new Date(value);
    setDateRange(dateRange);
  };

  return (
    <div className="flex flex-wrap justify-between gap-4">
      <Toggle.Root
        type="single"
        onValueChange={handlerToggleChange}
        loop
        className="flex-1 flex flex-wrap gap-4"
      >
        <Toggle.Item value="to" asChild>
          <button className="flex-1 btn-filter p-2 border-secondary text-secondary state-on:bg-secondary state-on:hover:text-secondary">
            Entrada
          </button>
        </Toggle.Item>
        <Toggle.Item value="from" asChild>
          <button className="flex-1 btn-filter p-2 border-alert hover:border-alert text-alert hover:text-alert state-on:bg-alert">
            Saída
          </button>
        </Toggle.Item>
      </Toggle.Root>
      <div className="flex flex-wrap gap-4 w-full lg:w-auto">
        <div className="flex-1 lg:flex-initial input-container p-2 items-center gap-3">
          <label htmlFor="from">De: </label>
          <input
            ref={dateFromRef}
            id="from"
            type="date"
            className="bg-[transparent] date-picker:hidden"
            onChange={handlerDateChange}
          />
        </div>
        <div className="flex-1 lg:flex-initial input-container p-2 items-center gap-3">
          <label htmlFor="to">Até: </label>
          <input
            ref={dateToRef}
            id="to"
            type="date"
            className="bg-[transparent] date-picker:hidden"
            onChange={handlerDateChange}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterTransactions;
