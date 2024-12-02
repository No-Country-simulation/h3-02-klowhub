export const getPlatformLogo = (platform: string) => {
  switch (platform) {
    case 'AppSheet':
      return '/images/appsheet_logo.png';
    case 'Power Apps':
      return '/svg/powerapp.svg';
    default:
      return '';
  }
};
