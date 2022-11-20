import { useRouter } from "next/router";

import { AxiosError } from "axios";

import { useThemeContext, useUserContext } from "../../../providers";
import { IUserRequest } from "../../../providers/userContext/interfaces";
import { loginSchema } from "../../../validators";
import Form from "../Form";
import Input from "../Input";

function LoginForm() {
  const { loadingToast } = useThemeContext();
  const { loginUser } = useUserContext();
  const router = useRouter();

  const onSubmit = async (data: IUserRequest) => {
    const loginToast = loadingToast();
    try {
      await loginUser(data);
      loginToast("Logado com sucesso", "success");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        let render = message;
        if (render === "username or password dont match") {
          render = "username ou senha não correspondem";
        }

        loginToast(render, "error");
      }

      loginToast("Erro inesperado", "error");
    }
  };

  return (
    <main
      className="
        flex flex-col rounded-lg overflow-hidden h-max
        border border-grey-2 dark:border-grey-0 bg-grey-0 dark:bg-grey-2
      "
    >
      <h2 className="py-2 bg-grey-2 dark:bg-grey-0 text-center text-primary text-3xl">
        Login
      </h2>
      <Form
        schema={loginSchema}
        onSubmit={onSubmit}
        className="flex flex-col gap-2 p-6"
      >
        <Input name="username" label="Username" />
        <Input name="password" label="Senha" type="password" />
        <button type="submit" className="btn-primary h-12">
          Entrar
        </button>
      </Form>
    </main>
  );
}

export default LoginForm;
