import { DocumentType } from '@typegoose/typegoose';
import UserModel, { User } from '../../dataBase/user.db';
import { IUser, UserSearchQuery } from '../../types/user.types';

function createUser(userObject: IUser) {
  return UserModel.createUserWithHashedPassword(userObject);
}

function updateUser(userId: string, userToUpdate: Omit<IUser, 'password'>) {
  return UserModel.findByIdAndUpdate(userId, userToUpdate, { new: true });
}

function deleteUser(userToDelete: DocumentType<User>) {
  return userToDelete.deleteOne();
}

function getUserByParam(searchParams: UserSearchQuery) {
  return UserModel.findOne(searchParams);
}

function updateUserPassword(newPassword: string, user: DocumentType<User>) {
  user.password = newPassword;
  return user.save();
}

export default {
  createUser,
  updateUser,
  deleteUser,
  getUserByParam,
  updateUserPassword
};
