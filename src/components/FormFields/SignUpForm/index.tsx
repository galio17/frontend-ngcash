import { useRouter } from "next/router";

import { AxiosError } from "axios";

import { useThemeContext, useUserContext } from "../../../providers";
import { IUserRequest } from "../../../providers/userContext/interfaces";
import { signUpSchema } from "../../../validators";
import Form from "../Form";
import Input from "../Input";

function SignUpForm() {
  const { loadingToast } = useThemeContext();
  const { signUp } = useUserContext();
  const router = useRouter();

  const onSubmit = async (data: IUserRequest & { confirmPassword: string }) => {
    const signUpToast = loadingToast();
    try {
      await signUp(data);
      signUpToast("Cadastrado com sucesso", "success");
      router.push("/dashboard");
    } catch (err) {
      if (err instanceof AxiosError) {
        const { message } = err.response?.data;
        let render = message;
        if (render === "username is already exist") {
          render = "Username indisponível";
        }

        return signUpToast(render, "error");
      }

      return signUpToast("Erro inesperado", "error");
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
        Cadastrar
      </h2>
      <Form
        schema={signUpSchema}
        onSubmit={onSubmit}
        className="flex flex-col gap-2 p-6"
      >
        <Input name="username" label="Username" />
        <Input name="password" label="Senha" type="password" />
        <Input name="confirmPassword" label="Confirmar senha" type="password" />
        <button type="submit" className="btn-primary h-12">
          Entrar
        </button>
      </Form>
    </main>
  );
}

export default SignUpForm;
