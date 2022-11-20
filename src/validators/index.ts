import * as yup from "yup";
import { IUserRequest } from "../providers/userContext/interfaces";

export const loginSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().required("Username obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export const signUpSchema: yup.SchemaOf<
  IUserRequest & { confirmPassword: string }
> = yup.object().shape({
  username: yup.string().required("Username obrigatório"),
  password: yup
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .required("Senha obrigatória")
    .matches(/[A-Z]/, "Senha deve ter letras maiúsculas")
    .matches(/\d/, "Senha deve ter números")
    .matches(/[.!@#$%&]/, "Senha deve ter símbolos: .!@#$%&")
    .required(),
  confirmPassword: yup
    .string()
    .required("Confirmar senha obrigatório")
    .oneOf([yup.ref("password")], "Senhas não compatíveis"),
});
