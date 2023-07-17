export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  needsPasswordChange: boolean;
  accessToken: string;
  refreshToken: string;
};
