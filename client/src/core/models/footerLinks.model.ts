import type { TranslationType } from '@coreTypes/translationType';

export const categories = (t: TranslationType<'Footer'>) => [
  { href: '#', label: t('categoryCourses') },
  { href: '#', label: t('categoryApps') },
  { href: '#', label: t('categorySellCourse') },
  { href: '#', label: t('categorySellApp') },
];

export const about = (t: TranslationType<'Footer'>) => [
  { href: '#', label: t('aboutInstructors') },
  { href: '#', label: t('aboutTermsOfService') },
  { href: '#', label: t('aboutPrivacyPolicy') },
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
