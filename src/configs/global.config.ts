const TokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessWord',
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshWord',
};

// const stores regular expressions
const PasswordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/;

const TokenRegex = /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/;

// enum with query params
enum InstanceParam {
  USER_ID = 'userId',
  RES_ID = 'restaurantId',
}

enum UserSubroutes {
  ROOT = '/',
  BY_USER_ID = `/:${InstanceParam.USER_ID}`,
  UPDATE_EMAIL = '/updateEmail',
  UPDATE_PASS = '/updatePassword',
}

enum AuthSubroutes {
  ROOT = '/',
  REFRESH_TOKENS = '/refreshTokens',
}

enum ResSubroutes {
  ROOT = '/',
  BY_RES_ID = `/:${InstanceParam.RES_ID}`,
  PERSONAL = `/recommendations/:${InstanceParam.USER_ID}`,
  TOP_RATED = '/top_rated',
  REST_PHOTOS_BY_ID = `/:${InstanceParam.RES_ID}/photos`,
}

enum FileSubroutes {
  REST_PHOTO = `/restaurants/:${InstanceParam.RES_ID}`,
}

enum FavoriteSubroutes {
  ROOT = '/',
  BY_USER_ID = `/:${InstanceParam.USER_ID}`,
}

// TYPES of instances or ect.
enum TokenTypes {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

enum UserValidationType {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  UPDATE_EMAIL = 'UPDATE_EMAIL',
  UPDATE_PASS = 'UPDATE_PASS',
}

enum SortOption {
  ASC = 'ASC', //ascending
  DESC = 'DESC', //descending
}

const MIN_NUMBER_OF_FAVORITES = 2;
const DEFAULT_PR_TOP_K = 5; // default number of personal recommendations, which will be given to user

enum EntityType {
  GENERAL = 'general',
  RESTAURANTS = 'restaurants',
}

const BYTE_SIZE = 1024;

const NODE_ENV_NAMES = {
  PROD: 'prod',
  REL: 'rel',
  DEV: 'dev',
};

export {
  AuthSubroutes,
  BYTE_SIZE,
  DEFAULT_PR_TOP_K,
  EntityType,
  FavoriteSubroutes,
  FileSubroutes,
  InstanceParam,
  MIN_NUMBER_OF_FAVORITES,
  PasswordRegex,
  ResSubroutes,
  SortOption,
  TokenConfig,
  TokenRegex,
  TokenTypes,
  UserSubroutes,
  UserValidationType,
  NODE_ENV_NAMES,
};
