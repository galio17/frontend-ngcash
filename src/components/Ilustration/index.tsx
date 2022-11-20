import Lottie, { Options } from "react-lottie";

function Ilustration({ src }: IIlustrationProps) {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: src,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
      className: "m-0 cursor-default",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      width="auto"
      height="calc(100vh - 200px)"
      isClickToPauseDisabled
    />
  );
}

export default Ilustration;
