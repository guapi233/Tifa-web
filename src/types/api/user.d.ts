export interface editUserInfoParams {
  gender: number;
  name: string;
  occupation: string;
  interest: string;
  summary: string;
}

export interface setNoticeParams {
  dailyNotice: number;
  importNotice: number;
}

export type getBlacklistedListReturn = {
  name: string;
  pic: string;
  usernumber: string;
  [key: string]: any;
}[];

export interface setPasswordParams {
  oldPassword?: string;
  newPassword: string;
  verifyCode?: string;
  sid?: string;
  usernumber?: string;
  [key: string]: any;
}
