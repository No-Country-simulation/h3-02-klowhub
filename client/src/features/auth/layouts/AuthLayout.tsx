import React from 'react';
interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  imageUrl: string;
}
export default function AuthLayout({ children, title, description, imageUrl }: AuthLayoutProps) {
  return (
    <div className="flex-col bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="flex h-screen w-screen flex-col justify-center gap-6 bg-[rgba(32,34,47,0.23)] p-6 backdrop-blur-lg min-[1025px]:flex-row min-[1025px]:items-start min-[1025px]:justify-between min-[1025px]:bg-transparent min-[1025px]:p-0 min-[1025px]:backdrop-blur-none">
        <div className="flex flex-col justify-start gap-0 text-center min-[1025px]:w-1/2 min-[1025px]:flex-1 min-[1025px]:items-start min-[1025px]:justify-start min-[1025px]:p-12">
          <h3 className="text-3xl text-white min-[1025px]:text-[54px]">{title}</h3>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 self-center min-[1025px]:h-screen min-[1025px]:flex-1 min-[1025px]:bg-[rgba(32,34,47,0.23)] min-[1025px]:p-12 min-[1025px]:text-xl min-[1025px]:font-bold min-[1025px]:backdrop-blur-lg">
          <div className="flex flex-col items-center gap-4 self-center">
            <p className="text-xs text-white">{description}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
