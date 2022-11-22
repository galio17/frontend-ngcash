import { AxiosError } from "axios";
import { ChangeEventHandler } from "react";
import { useThemeContext, useUserContext } from "../../../providers";
import { ITransferRequest } from "../../../providers/userContext/interfaces";
import { transferSchema } from "../../../validators";
import Form from "../Form";
import Input from "../Input";

function TransferForm() {
  const { loadingToast } = useThemeContext();
  const { transfer, transactions, setTransactions, user, setUser } =
    useUserContext();

  const onSubmit = async (data: ITransferRequest) => {
    const transferToast = loadingToast();

    try {
      await transfer(data);

      return transferToast("Transferência realizada com sucesso", "success");
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        return transferToast("Erro inesperado", "error");
      }

      if (!err.response) {
        return transferToast(err.message, "error");
      }

      const { message } = err.response?.data;
      let render = message;
      if (render === "balance insufficient to transfer") {
        render = "Saldo insuficiente";
      }
      if (render === "User not found") {
        render = "Usuário inexistente";
      }
      if (render === "cant transfer to yourself") {
        render = "Não é possível transferir a si mesmo";
      }

      return transferToast(render, "error");
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    let { value } = event.target;
    value = value
      .replace(/\D/g, "")
      .replace(/^/, "000")
      .replace(/(\d)(\d{2})$/, "$1.$2");
    value = Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

    event.target.value = value;
  };

  return (
    <section className="form">
      <h2 className="form__title">Transferência</h2>
      <Form
        schema={transferSchema}
        onSubmit={onSubmit}
        className="flex flex-col gap-2 p-6"
      >
        <Input name="to" label="Para quem" />
        <Input name="value" label="Valor" type="text" onChange={onChange} />
        <button type="submit" className="btn-primary h-12">
          Transferir
        </button>
      </Form>
    </section>
  );
}

export default TransferForm;
