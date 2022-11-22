import * as yup from "yup";
import {
  ITransferRequest,
  IUserRequest,
} from "../providers/userContext/interfaces";

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

export const transferSchema: yup.SchemaOf<ITransferRequest> = yup
  .object()
  .shape({
    to: yup.string().required("Para quem obrigatório"),
    value: yup
      .number()
      .required("Valor obrigatório")
      .min(0.01, "Valor deve ser maior que 0")
      .transform((_value, original) => {
        if (typeof original === "string") {
          original = original
            .replace(/\D/g, "")
            .replace(/(\d)(\d{2})$/, "$1.$2");
          return +original;
        }
        return;
      }),
  });
