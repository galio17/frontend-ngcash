import Form from "../Form";
import Input from "../Input";

function LoginForm() {
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
      <Form onSubmit={() => {}} className="flex flex-col gap-2 p-6">
        <Input name="username" label="Username" />
        <Input name="password" label="Senha" />
        <button type="submit" className="btn-primary h-12">
          Entrar
        </button>
      </Form>
    </main>
  );
}

export default LoginForm;
