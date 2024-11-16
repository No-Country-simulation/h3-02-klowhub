export const configuration = () => {
    const testing = process.env.NODE_ENV !== 'production';
    return {
      PORT: Number(process.env.PORT),
      URL: process.env.URL,
      testing,
    };
  };
  