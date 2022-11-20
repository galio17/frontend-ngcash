import Lottie, { Options } from "react-lottie";

import animationData from "../assets/json/piggy-bank.json";
import LoginForm from "../components/FormFields/LoginForm";
import Header from "../components/Header";

function Home() {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      className: "m-0 cursor-default",
    },
  };

  return (
    <div className="page flex flex-col">
      <Header>
        <button className="btn">Cadastrar-se</button>
      </Header>
      <section className="flex-1 py-3 px-5 flex">
        <div className="container mx-auto flex justify-around items-center relative">
          <LoginForm />
          <aside className="flex max-sm:hidden items-center">
            <Lottie
              options={defaultOptions}
              width="auto"
              height="calc(100vh - 200px)"
              isClickToPauseDisabled
            />
            <div className="object-fill cursor"></div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Home;
