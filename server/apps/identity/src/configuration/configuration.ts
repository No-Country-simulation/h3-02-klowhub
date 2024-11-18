
export const configuration = () => {
  const testing = process.env.NODE_ENV !== 'production';
  return {
    PORT: Number(process.env.PORT),
    URL: process.env.URL,
    APP_ID: process.env.APP_ID,
    APP_DOMAIN: process.env.APP_DOMAIN,
    testing,
    jwt: {
      access: {
        secret: process.env.JWT_ACCESS_SECRET,
        time: parseInt(process.env.JWT_ACCESS_TIME, 10),
      },
      confirmation: {
        secret: process.env.JWT_CONFIRMATION_SECRET,
        time: parseInt(process.env.JWT_CONFIRMATION_TIME, 10),
      },
      resetPassword: {
        secret: process.env.JWT_RESET_PASSWORD_SECRET,
        time: parseInt(process.env.JWT_RESET_PASSWORD_TIME, 10),
      },
      refresh: {
        secret: process.env.JWT_REFRESH_SECRET,
        time: parseInt(process.env.JWT_REFRESH_TIME, 10),
      },
    },
  };
};
