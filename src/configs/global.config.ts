const TokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessWord',
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshWord'
};

const PasswordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;

enum GlobalRoutes {
  USERS = '/users',
  AUTH = '/auth'
}

export { TokenConfig, PasswordRegex, GlobalRoutes };
