import { useContext } from "react";
import ThemeProvider, { ThemeContext } from "./themeContext";
import UserProvider, { UserContext } from "./userContext";

export const useThemeContext = () => useContext(ThemeContext);
export const useUserContext = () => useContext(UserContext);

export { ThemeProvider, UserProvider };
