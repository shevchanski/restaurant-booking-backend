const TokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessWord',
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshWord'
};

const PasswordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;

enum GlobalRoutes {
  USERS = '/users',
  AUTH = '/auth',
  RESTAURANTS = '/restaurants'
}

enum UserSubroutes {
  ROOT = '/',
  BY_USER_ID = '/:userId',
  UPDATE_EMAIL = '/updateEmail',
  UPDATE_PASS = '/updatePassword'
}

enum AuthSubroutes {
  ROOT = '/',
  REFRESH_TOKENS = '/refreshTokens'
}

const TokenRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;

enum TokenTypes {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH'
}

enum UserValidationType {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_PASS = 'UPDATE_PASS'
}

enum ResSubroutes {
  ROOT = '/'
}

export {
  AuthSubroutes,
  GlobalRoutes,
  PasswordRegex,
  ResSubroutes,
  TokenConfig,
  TokenRegex,
  TokenTypes,
  UserSubroutes,
  UserValidationType
};
