import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { ENUM_USER_ROLE } from '../../../enums/user';
import ApiError from '../../../errors/ApiErrors';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { Student } from '../student/student.model';
import { User } from '../user/user.model';
import {
  IChangePassword,
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import { sendEMail } from './sendResetMail';

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = JwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { userId } = verifiedToken;

  // checking deleted user's refresh token
  const isUserExist = await User.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // generate new token
  const newAccessToken = JwtHelpers.createToken(
    { id: isUserExist?.id, role: isUserExist?.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  passwordData: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = passwordData;

  // const isUserExist = await User.isUserExist(user?.userId);
  // alternative awy
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  //chaking old password

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  // eslint-disable-next-line no-unused-expressions
  (isUserExist.password = newPassword),
    (isUserExist.needsPasswordChange = false);
  isUserExist.save();

  /*const newHashPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  // update Password
  const updatedData = {
    pasaword: newHashPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  };
  await User.findOneAndUpdate({ id: user?.userId }, updatedData);*/
};

const forgotPassword = async (payload: { id: string }) => {
  const user = await User.findOne({ id: payload?.id }, { id: 1, role: 1 });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User does not exist!');
  };

  let profile = null;

  if (user?.role === ENUM_USER_ROLE.ADMIN) {
    profile = await Admin.findOne({ id: user?.id });
  } else if (user?.role === ENUM_USER_ROLE.FACULTY) {
    profile = await Faculty.findOne({ id: user?.id });
  } else if (user?.role === ENUM_USER_ROLE.STUDENT) {
    profile = await Student.findOne({ id: user?.id });
  };

  if (!profile) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile  not found!');
  };

  if (!profile?.email) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email  not found!');
  };

  const passwordResetToken = await JwtHelpers.createPasswordResetToken({ id: user?.id }, config.jwt.secret as string, '5m');

  const resetLink: string = config.resetLink + `token=${passwordResetToken}`;

  await sendEMail(profile?.email, `
    <div>
       <p>Hi, ${profile?.name?.firstName}</p>
       <p>your password reset link: <a href=${resetLink}>Click Here</a></p>
       <p>Thank you</p>
    </div>`);



  return {
    message: "Check your email!!"
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword
};
