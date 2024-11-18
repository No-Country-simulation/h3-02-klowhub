

export const configuration = () => {
  const environemnt = process.env.NODE_ENV;
  const testing = environemnt !== 'production';
  return {
    URL: process.env.URL,
    PORT: Number(process.env.PORT),
    USERS_SVC_URL: process.env.USERS_SVC_URL,
    USERS_SVC_PORT: Number(process.env.USERS_SVC_PORT),
    COURSES_SVC_URL: process.env.COURSES_SVC_URL,
    COURSES_SVC_PORT: Number(process.env.COURSES_SVC_PORT),
    NODE_ENV: environemnt,
    ACCESS_TIME: Number(process.env.JWT_ACCESS_TIME),
    CONFIRMATION_TIME: Number(process.env.JWT_CONFIRMATION_TIME),
    REFRESH_TIME: Number(process.env.JWT_REFRESH_TIME),
    RESET_PASSWORD_TIME: Number(process.env.RESET_PASSWORD_TIME),
    testing,
  };
};
