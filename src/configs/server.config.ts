export default {
  PORT: !isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 3000
};
