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

enum UserSubroutes {
  ROOT = '/',
  BY_USER_ID = '/:userId',
  UPDATE_EMAIL = `${BY_USER_ID}/updateEmail`
}

enum AuthSubroutes {
  ROOT = '/'
}

export {
  TokenConfig,
  PasswordRegex,
  GlobalRoutes,
  UserSubroutes,
  AuthSubroutes
};
