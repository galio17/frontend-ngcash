import Link from "next/link";

import animationData from "../assets/json/piggy-bank.json";
import LoginForm from "../components/FormFields/LoginForm";
import Header from "../components/Header";
import Ilustration from "../components/Ilustration";

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
          <aside className="flex max-sm:hidden items-center">
            <Ilustration src={animationData} />
            <div className="object-fill cursor"></div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Home;
