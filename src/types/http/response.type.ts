export type HttpReponse<T = undefined> = {
  status: number;
  data?: T;
  message?: string;
};