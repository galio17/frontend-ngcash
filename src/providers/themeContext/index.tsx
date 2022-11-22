import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

import {
  toast,
  ToastContainer,
  ToastOptions,
  TypeOptions,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  IThemeContext,
  IThemeProviderProps,
  TChangeTheme,
  TLoadingToast,
} from "./interfaces";

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider({ children }: IThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  const changeTheme: TChangeTheme = () => {
    setIsDark(!isDark);
    setCookie(null, "@ngcash:theme", !isDark ? "dark" : "light", {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    document.body.classList.toggle("dark");
  };

  const loadingToast: TLoadingToast = (message, config) => {
    const toastId = toast.loading(message ?? "Um momento...");
    const options: ToastOptions = config ?? {
      isLoading: false,
      autoClose: 3000,
      closeOnClick: true,
      draggable: true,
    };

    const updateToast = (render: string, type: TypeOptions) => {
      toast.update(toastId, { ...options, type, render });
    };

    return updateToast;
  };

  useEffect(() => {
    if (
      parseCookies()["@ngcash:theme"] === "dark" ||
      (!("@ngcash:theme" in parseCookies()) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ changeTheme, loadingToast, isDark }}>
      <ToastContainer
        theme={isDark ? "dark" : "light"}
        position="top-center"
        newestOnTop
      />
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
