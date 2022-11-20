import { ToastOptions, TypeOptions } from "react-toastify";

type TChangeTheme = () => void;

type TUpdateToast = (render: string, type: TypeOptions) => void;

type TLoadingToast = (
  message?: string,
  config?: Omit<ToastOptions, "type">
) => TUpdateToast;

interface IThemeContext {
  changeTheme: TChangeTheme;
  loadingToast: TLoadingToast;
  isDark: boolean;
}

interface IThemeProviderProps {
  children: ReactNode;
}
