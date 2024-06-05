const TokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessWord',
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshWord'
};

// const stores regular expressions
const PasswordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;

const TokenRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;

//   enums with all possible API routes
enum GlobalRoutes {
  USERS = '/users',
  AUTH = '/auth',
  RESTAURANTS = '/restaurants',
  FILES = '/files',
  FAVORITES = '/favorites'
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

enum ResSubroutes {
  ROOT = '/',
  BY_RES_ID = '/:restaurantId',
  PERSONAL = '/personalRecommendations/:userId'
}

enum FileSubroutes {
  REST_PHOTO = `/restaurants${ResSubroutes.BY_RES_ID}`
}

enum FavoriteSubroutes {
  ROOT = '/'
}

// TYPES of instances or ect.
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

enum InstanceParam {
  USER_ID = 'userId',
  RES_ID = 'restaurantId'
}

enum SortOption {
  ASC = 'ASC', //ascending
  DESC = 'DESC' //descending
}

const MIN_NUMBER_OF_FAVORITES = 2;
const DEFAULT_PR_TOP_K = 5; // default number of personal recommendations, which will be given to user

enum EntityType {
  GENERAL = 'general',
  RESTAURANTS = 'restaurants'
}

const BYTE_SIZE = 1024;

export {
  AuthSubroutes,
  BYTE_SIZE,
  DEFAULT_PR_TOP_K,
  EntityType,
  FavoriteSubroutes,
  FileSubroutes,
  GlobalRoutes,
  InstanceParam,
  MIN_NUMBER_OF_FAVORITES,
  PasswordRegex,
  ResSubroutes,
  SortOption,
  TokenConfig,
  TokenRegex,
  TokenTypes,
  UserSubroutes,
  UserValidationType
};
