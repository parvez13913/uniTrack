import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }

  const createdUser = await User.create(user);

  if (!createUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
