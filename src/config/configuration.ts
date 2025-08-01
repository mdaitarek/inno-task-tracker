export const configuration = () => ({
  MONGODB: process.env.MONGO_URI,
  JWT: {
    ACCESS_TOKEN_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_VALIDITY: process.env.JWT_EXPIRES_IN,
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_VALIDITY: process.env.JWT_REFRESH_VALIDITY,
  },
});
