import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }

  // Match password
  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // access token && refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;
  const accessToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = JwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    needsPasswordChange,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
