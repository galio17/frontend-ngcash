import Link from "next/link";

import animationData from "../../assets/json/piggy-bank.json";
import SignUpForm from "../../components/FormFields/SignUpForm";
import Header from "../../components/Header";
import Ilustration from "../../components/Ilustration";

function SignUp() {
  return (
    <div className="page before:rotate-180 flex flex-col">
      <Header>
        <Link href="/" className="btn">
          Entrar
        </Link>
      </Header>
      <section className="flex-1 py-3 px-5 flex">
        <div className="container mx-auto flex justify-around items-center relative">
          <aside className="flex max-sm:hidden items-center">
            <Ilustration src={animationData} />
            <div className="object-fill cursor"></div>
          </aside>
          <SignUpForm />
        </div>
      </section>
    </div>
  );
}

export default SignUp;
