interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

type UserSearchQuery = {
  [key in keyof IUser]?: string;
};

export { IUser, UserSearchQuery };
