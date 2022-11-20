import * as yup from "yup";
import { IUserRequest } from "../providers/userContext/interfaces";

export const loginSchema: yup.SchemaOf<IUserRequest> = yup.object().shape({
  username: yup.string().required("Username obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});
