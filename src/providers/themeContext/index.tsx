import { createContext, ReactNode, useEffect, useState } from "react";

interface IThemeProviderProps {
  children: ReactNode;
}

interface IThemeContext {
  changeTheme(): void;
  isDark: boolean;
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

function ThemeProvider({ children }: IThemeProviderProps) {
  const [isDark, setIsDark] = useState(true);

  const changeTheme = () => {
    setIsDark(!isDark);
    localStorage.theme = isDark ? "dark" : "light";
    document.body.classList.toggle("dark");
  };

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
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
    <ThemeContext.Provider value={{ changeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
