import Link from "next/link";

import LoginForm from "../components/FormFields/LoginForm";
import Header from "../components/Header";

function Home() {
  return (
    <div className="page before:bg-right">
      <Header>
        <Link href="/signUp" className="btn">
          Cadastrar-se
        </Link>
      </Header>
      <section className="flex-1 py-3 px-5 flex">
        <div className="container mx-auto flex justify-around items-center relative">
          <LoginForm />
        </div>
      </section>
    </div>
  );
}

export default Home;
