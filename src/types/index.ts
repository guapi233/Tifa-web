import { AxiosResponse } from "axios";

interface resData<T = any> {
  isOk: number;
  data: T;
}

export type response<T = any> = Promise<AxiosResponse<resData<T>>>;
