const TokenConfig = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || 'accessWord',
  REFRESH_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refreshWord'
};

export { TokenConfig };
