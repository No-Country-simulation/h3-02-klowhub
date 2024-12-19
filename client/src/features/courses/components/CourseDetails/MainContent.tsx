import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React from 'react';
import CheckList from '@core/components/CheckList';
import H2SimpleSection from '@core/components/H2SimpleSection';
import ShowMore from '@core/components/ShowMore';
import type { Locale } from '@core/lib/i18nRouting';
import type { CourseDetailsType } from '@features/courses/types/coursedetails.types';
import VideoPlayer from '../VideoPlayer';

interface MainContentProps {
  course: CourseDetailsType;
  locale: Locale;
  creatorFirstName?: string;
  creatorDesc?: string;
  creatorWhyLearning?: string;
  creatorImage?: string;
}

export const MainContent = ({
  course,
  locale,
  creatorDesc,
  creatorWhyLearning,
  creatorImage,
  creatorFirstName,
}: MainContentProps) => {
  const t = useTranslations<'CourseDetail'>('CourseDetail');
  return (
    <div className="w-full text-white lg:w-5/6 lg:pr-8">
      <h1 className="mb-4 text-2xl font-bold">{course?.title}</h1>
      <p className="mb-4 text-base">{course?.detailedContent}</p>
      {/*<div className="flex items-center mb-6">
        <span className="mr-2 font-bold text-lg text-yellow-400">4.1</span>
        <div className="flex items-center mr-4">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              fill={i < 4 ? 'yellow' : 'gray'}
              viewBox="0 0 24 24"
              className="size-5">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-300 text-sm">(74 reviews)</span>
      </div> */}

      {/* Aqui el video Player */}
      <VideoPlayer
        src={course.videoPresentationUrl /*agregat intro curso*/ || ''}
        poster={'/images/mocks/course_mock1.png'}
        locale={locale}
      />

      {/* Header con información del perfil */}
      <ShowMore maxHeight={610}>
        <div className="mt-7 h-fit w-full space-y-9 rounded-lg bg-neutral-100 p-6 px-4 py-8 text-white shadow-app-1 min-[620px]:space-y-6 min-[620px]:px-14 min-[620px]:py-10">
          <div className="flex items-center space-x-4">
            <Image
              width={50}
              height={50}
              className="size-16 rounded-full object-cover"
              src={creatorImage || '/images/mocks/avatar_mock1.png'} // Reemplaza con la URL real de la imagen
              alt={creatorFirstName || 'Sebastián Ríos'}
            />

            <div>
              <h2 className="text-xl font-semibold">{creatorFirstName}</h2>
              {creatorDesc ? <p className="text-sm text-gray-400">{creatorDesc}</p> : null}
              {/*
            <a href="#" className="mt-1 text-purple-400 text-sm hover:underline">
              Ver perfil
            </a>
            */}
            </div>
          </div>

          {/* Sección de objetivos */}
          <H2SimpleSection title={t('afterCompletingCourse')}>
            <CheckList items={course.followUp} />
          </H2SimpleSection>
          <H2SimpleSection title={t('aboutCourse')}>
            <p className="text-sm font-normal text-white">{course.detailedContent}</p>
          </H2SimpleSection>

          {/* Botones */}
          {/*<div>
          <div className="flex items-center space-x-4 mt-6">
            <Button
              style={{
                backgroundColor: 'var(--color-primary-B-500)',
                borderColor: 'var(--color-primary-A-500)',
              }}
              className="hover:bg-purple-700 px-6 py-2 rounded-md font-semibold text-sm text-white transition-colors">
              Añadir al carrito
            </Button>
          </div>
          <div className="flex space-x-2 m-1 mt-4">
            <h3 className="mr-1"> Compartir : </h3>
            <a href="#" className="text-gray-400 text-sm hover:text-white">
              ✉
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white">
              🌐
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white">
              💬
            </a>
            <a href="#" className="text-gray-400 text-sm hover:text-white">
              🔗
            </a>
          </div>
        </div>*/}

          {creatorWhyLearning ? (
            <H2SimpleSection title={t('whyLearnWith')} titleVariant="textxl">
              <p className="text-sm font-normal text-white">{creatorWhyLearning}</p>
            </H2SimpleSection>
          ) : null}
          <H2SimpleSection title={t('whoIsThisFor')} titleVariant="textxl">
            <p className="text-sm font-normal text-white">{course.followUp}</p>
          </H2SimpleSection>
          <H2SimpleSection title={t('requirements')} titleVariant="textxl">
            <CheckList items={course.prerequisites} />
          </H2SimpleSection>
          <H2SimpleSection title={t('whatIncludes')} titleVariant="textxl">
            <CheckList items={course.contents} />
          </H2SimpleSection>
        </div>
      </ShowMore>
    </div>
  );
};
