import { ToastOptions, TypeOptions } from "react-toastify";

export type TChangeTheme = () => void;

export type TUpdateToast = (render: string, type: TypeOptions) => void;

export type TLoadingToast = (
  message?: string,
  config?: Omit<ToastOptions, "type">
) => TUpdateToast;

export interface IThemeContext {
  changeTheme: TChangeTheme;
  loadingToast: TLoadingToast;
  isDark: boolean;
}

export interface IThemeProviderProps {
  children: ReactNode;
}
