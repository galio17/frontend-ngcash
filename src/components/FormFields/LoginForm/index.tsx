import { useRouter } from "next/router";

import { AxiosError } from "axios";

import { useThemeContext, useUserContext } from "../../../providers";
import { IUserRequest } from "../../../providers/userContext/interfaces";
import { loginSchema } from "../../../validators";
import Form from "../Form";
import Input from "../Input";

function LoginForm() {
  const { loadingToast } = useThemeContext();
  const { login } = useUserContext();
  const router = useRouter();

  const onSubmit = async (data: IUserRequest) => {
    const loginToast = loadingToast();
    try {
      await login(data);
      loginToast("Logado com sucesso", "success");
      router.push("/dashboard");
    } catch (err) {
      if (!(err instanceof AxiosError)) {
        return loginToast("Erro inesperado", "error");
      }

      if (!err.response) {
        return loginToast(err.message, "error");
      }

      const { message } = err.response.data;
      let render = message;
      if (render === "username or password dont match") {
        render = "Username ou senha não correspondem";
      }

      return loginToast(render, "error");
    }
  };

  return (
    <main className="form">
      <h2 className="form__title">Login</h2>
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
