import { apiReturn } from "@/types/index";

export interface loginParams {
  sid: string;
  usernumber: string;
  password: string;
  captcha: string;
}
export type loginReturn = apiReturn<{
  userInfo: {
    name: string;
    pic: string;
    roles: number[];
    mobile: string;
    email: string;
    status: number;
    summary: string;
    gender: number;
    title: number[];
    follow: number;
    followed: number;
    occupation: string;
    interest: string;
    dailyNotice: number;
    importNotice: number;
    trendVisible: number;
    collectionVisible: number;
    _id: string;
    usernumber: string;
    created: string;
    systemCount: number;
    alias: string;
  };
  token: string;
}>;
