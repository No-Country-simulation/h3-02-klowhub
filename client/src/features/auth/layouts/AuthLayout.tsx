import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}
export default function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="h-screen w-screen flex-col bg-[url('/images/extraBanner.png')] bg-cover bg-center">
      <div className="flex flex-col justify-center gap-6 bg-[rgba(32,34,47,0.23)] p-6 min-[1024px]:flex-row min-[1024px]:items-start min-[1024px]:justify-between min-[1024px]:bg-transparent min-[1024px]:p-0">
        <div className="flex flex-1 flex-col justify-center text-center min-[1024px]:w-1/2 min-[1024px]:items-start min-[1024px]:justify-start min-[1024px]:p-12">
          <h3 className="text-3xl text-white min-[1024px]:text-[54px]">{title}</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 self-center min-[1024px]:h-screen min-[1024px]:bg-[rgba(32,34,47,0.23)] min-[1024px]:p-12 min-[1024px]:text-xl min-[1024px]:font-bold">
          <div className="flex flex-col items-center gap-4 self-center">
            <p className="text-xs text-white">{description}</p>
            {children}
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
