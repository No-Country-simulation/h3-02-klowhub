import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';
import Badge from '@core/components/Badge/Index';
import Button from '@core/components/Button';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';

interface UserProfileCardProps {
  creator: CreatorCourseType | null;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ creator }) => {
  const t = useTranslations<'Cart'>('Cart');
  return (
    <div className="rounded-xl bg-neutral-100 pr-4 text-white">
      {/* Grid principal */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Foto de perfil y nombre */}
        <div className="mb-4 mt-11 flex flex-col items-center sm:mb-0 lg:mb-2">
          <Image
            src={creator?.image || '/images/mocks/avatar_mock1.png'}
            alt="Foto de perfil"
            className="size-[175px] rounded-full object-cover"
            width={175}
            height={175}
          />
          <Button variant={'ghost'} className="m-0 mt-2 text-sm">
            <Link href="/projects">{t('ImagenPerfil')}</Link>
          </Button>
          <h1 className="mt-10 text-center text-xl font-semibold">{creator?.firstName}</h1>
        </div>

        {/* Contenedor derecho para estadísticas y descripción */}
        <div className="col-span-2 flex flex-col justify-start gap-4">
          {/* Vendedor PRO y estadísticas */}
          <div className="mt-4">
            <div className="m:md-0 m-4 flex items-center gap-2">
              <p className="text-md text-primary-A-100">{t('Vendedor')}</p>
              <Badge text="PRO" variant="pro" />
            </div>
            <div className="m:md-0 m-4 mb-12 mt-6 flex flex-col gap-4 text-center md:flex-row">
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-primary-B-200">{5}</p>
                <p className="text-sm text-gray-300">{t('CursosPublicados')}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-primary-B-200">{3}</p>
                <p className="text-sm text-gray-300">{t('AplicacionesCreadas')}</p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-primary-B-200">{15}</p>
                <p className="text-sm text-gray-300">{t('Suscripciones')}</p>
              </div>
            </div>
            {/* Descripción */}
            <div className="m:md-0 m-4 rounded-lg bg-slate-800 p-2 pt-4 shadow-app-1">
              <h2 className="m-3 mb-4 text-lg font-semibold">{t('SobreMi')}</h2>
              <p className="m-3 mt-2 py-3 text-justify text-sm text-gray-300">
                {creator?.biograophy}
              </p>
              <div className="flex justify-end">
                <Image
                  src="/images/sms.png"
                  width={27}
                  alt="ico"
                  height={27}
                  className="brightness-1 m-2 object-cover invert"></Image>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
