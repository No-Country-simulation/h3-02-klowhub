import type { ReactNode } from 'react';
import Navigator from '../Navigator/Index';

interface NavigatorDefaultStyleProps {
  children: ReactNode;
  href: string;
  styleNumber?: string | number;
}

interface NavigatorVars {
  bgSize: string;
  bgPosition: string;
  bgSizeWidth: string;
  bgSizeHeight: string;
}

const navigatorStyles: Record<string | number, NavigatorVars> = {
  '1': { bgSize: '290% 175%', bgSizeWidth: '290%', bgSizeHeight: '175%', bgPosition: '3% 20%' },
  '2': { bgSize: '300% 240%', bgSizeWidth: '300%', bgSizeHeight: '240%', bgPosition: '-50% 3%' },
  '3': { bgSize: '125% 100%', bgSizeWidth: '125%', bgSizeHeight: '100%', bgPosition: '55% 100%' },
  '4': { bgSize: '300% 240%', bgSizeWidth: '300%', bgSizeHeight: '240%', bgPosition: '-50% 3%' },
};

export default function NavigatorDefaultStyle({
  children,
  href,
  styleNumber = '1',
}: NavigatorDefaultStyleProps) {
  return (
    <Navigator
      href={href}
      bgPosition={navigatorStyles[styleNumber]?.bgPosition || ''}
      bgSizeWidth={navigatorStyles[styleNumber]?.bgSizeWidth || ''}
      bgSizeHeight={navigatorStyles[styleNumber]?.bgSizeHeight || ''}
      bgImage="/images/klowhub_banner2.png"
      className="w-[48%] lg:w-full">
      {children}
    </Navigator>
  );
}
