import type { TranslationType } from '@coreTypes/translationType';

export const categories = (t: TranslationType<'Footer'>) => [
  { href: '/courses', label: t('categoryCourses') },
  { href: '/appstore', label: t('categoryApps') },
  { href: '/consultancies', label: t('categorySellCourse') },
  { href: '/projects', label: t('categorySellApp') },
];

export const about = (t: TranslationType<'Footer'>) => [
  { href: '/mentors', label: t('aboutInstructors') },
  { href: '/help/terms-and-conditions', label: t('aboutTermsOfService') },
  { href: '/help/privacy-policy', label: t('aboutPrivacyPolicy') },
];

export const support = (t: TranslationType<'Footer'>) => [
  { href: '#', label: t('supportFAQ') },
  { href: '#', label: t('supportContact') },
  { href: '#', label: t('supportForum') },
];

export const socialLinks = [
  { href: '#', src: '/svg/facebookIn.svg', alt: 'Facebook', size: 16 },
  { href: '#', src: '/svg/twitter.svg', alt: 'Twitter/X', size: 30 },
  { href: '#', src: '/svg/linkedin.svg', alt: 'LinkedIn', size: 30 },
];
