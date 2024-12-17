import Image from 'next/image';
import React from 'react';

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="w-240 h-150 rounded-md bg-white/10 p-4 text-white shadow-md">
      <div className="flex justify-start">
        <Image
          src="/images/sms.png"
          width={24}
          alt="ico"
          height={24}
          className="mb-4 object-cover py-2 brightness-0 invert"></Image>
      </div>
      <h2 className="mb-1 text-lg font-semibold">{title}</h2>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};

export default InfoCard;
