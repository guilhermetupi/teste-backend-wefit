import { HttpStatusCode } from "./status-code.type";

export type HttpReponse<T = undefined> = {
  status: HttpStatusCode;
  data?: T;
  message?: string;
};
