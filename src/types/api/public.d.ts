import { getCaptcha } from "@/api/public";

export interface getUserInfoReturn {
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
  usernumber: string;
  created: string;
  systemCount: number;
  isFollowed: number;
  blacklisted: boolean;
  jointed: number;
  articleCount: number;
  likeCount: number;
  viewCount: number;
}

export interface sendMailParams {
  type: number;
  email?: string;
  sid?: string;
  usernumber?: string;
}

export type getTrendListReturn = {
  data: any;
  [key: string]: any;
}[];
