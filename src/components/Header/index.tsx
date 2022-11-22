import Image from "next/image";

import { FaRegLightbulb } from "react-icons/fa";
import { useThemeContext } from "../../providers";

function Header({ children }: IHeaderProps) {
  const { changeTheme, isDark } = useThemeContext();

  const logo = isDark ? "/logo_ng_cash.gif" : "/logo_ng_cash-light.gif";

  return (
    <header
      className="
        shadow-lg px-5 sticky top-0 z-10
        shadow-[#0005] dark:shadow-[#fff5] bg-grey-0 dark:bg-grey-2
      "
    >
      <div className="container flex justify-between items-center mx-auto">
        <figure>
          <Image src={logo} alt="Logo" width={80} height={80} />
        </figure>
        <div className="flex-1 flex justify-end items-stretch dark gap-2">
          {children}
          <button className="btn" onClick={changeTheme}>
            <FaRegLightbulb className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
