import { DocumentType } from '@typegoose/typegoose';
import UserModel, { User } from '../../dataBase/user.db';
import { IUser, UserSearchQuery } from '../../types/user.types';

function createUser(userObject: IUser) {
  return UserModel.createUserWithHashedPassword(userObject);
}

function updateUser(userId: string, userToUpdate: IUser) {
  return UserModel.findByIdAndUpdate(userId, userToUpdate, { new: true });
}

function deleteUser(userToDelete: DocumentType<User>) {
  return userToDelete.deleteOne();
}

function getUserByParam(searchParams: UserSearchQuery) {
  return UserModel.findOne(searchParams);
}

export default { createUser, updateUser, deleteUser, getUserByParam };
