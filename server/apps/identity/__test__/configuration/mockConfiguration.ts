export const MOCK_PORT = 3000;

export const mockConfigService = {
  get: jest.fn().mockImplementation((key: string) => {
    if (key === 'server.port') {
      return MOCK_PORT;
    }
    switch (key) {
      case 'jwt':
        return {
          access: { secret: 'accessSecret', time: '2700000' },
          refresh: { secret: 'refreshSecret', time: '2700000' },
          confirmation: { secret: 'confirmationSecret', time: '2700000' },
          resetPassword: { secret: 'resetSecret', time: '2700000' },
        };
      case 'APP_ID':
        return 'test-app-id';
      case 'APP_DOMAIN':
        return 'test-app-domain';
      default:
        return null;
    }
  }),
};
