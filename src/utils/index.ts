import { v4 as uuidv4 } from "uuid";

export const getSid = (): string => {
  return uuidv4();
}