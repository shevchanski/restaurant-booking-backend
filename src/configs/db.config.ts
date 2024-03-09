const MONGODB_SERVER_URI =
  process.env.MONGODB_SERVER_URI ?? 'mongodb://localhost:27017';

const DatabaseConfig = {
  MONGO_PROD_URI: `${MONGODB_SERVER_URI}/restaurantBooking`
};

export { DatabaseConfig };
