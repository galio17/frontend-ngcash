import Link from "next/link";

import SignUpForm from "../../components/FormFields/SignUpForm";
import Header from "../../components/Header";

function SignUp() {
  return (
    <div className="page before:rotate-180">
      <Header>
        <Link href="/" className="btn">
          Entrar
        </Link>
      </Header>
      <section className="flex-1 py-3 px-5 flex">
        <div className="container mx-auto flex justify-around items-center relative">
          <SignUpForm />
        </div>
      </section>
    </div>
  );
}

export default SignUp;
