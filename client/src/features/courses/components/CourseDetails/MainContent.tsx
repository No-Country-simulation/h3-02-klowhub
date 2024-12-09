import Image from 'next/image';
import React from 'react';
import CheckList from '@core/components/CheckList';
import H2SimpleSection from '@core/components/H2SimpleSection';
import type { Locale } from '@core/lib/i18nRouting';
import type { CourseDetailsType } from '@features/courses/types/coursedetails.types';
import VideoPlayer from '../VideoPlayer';

interface MainContentProps {
  course: CourseDetailsType;
  locale: Locale;
  creatorDesc?: string;
  creatorWhyLearning?: string;
}

export const MainContent = async ({
  course,
  locale,
  creatorDesc,
  creatorWhyLearning,
}: MainContentProps) => {
  return (
    <div className="w-full text-white lg:w-5/6 lg:pr-8">
      <h1 className="mb-4 text-2xl font-bold">{course?.name}</h1>
      <p className="mb-4 text-base">{course?.courseAbout}</p>
      {/*<div className="mb-6 flex items-center">
        <span className="mr-2 text-lg font-bold text-yellow-400">4.1</span>
        <div className="mr-4 flex items-center">
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
        <span className="text-sm text-gray-300">(74 reviews)</span>
      </div> */}

      {/* Aqui el video Player */}
      <VideoPlayer src={course.courseIntro || ''} poster={course.coursePoster} locale={locale} />

      {/* Header con información del perfil */}
      <div className="mx-auto mb-8 mt-7 space-y-6 rounded-lg bg-gray-800 p-6 text-white shadow-app-1">
        <div className="flex items-center space-x-4">
          <Image
            width={50}
            height={50}
            className="size-16 rounded-full object-cover"
            src="/images/mocks/avatar_mock1.png" // Reemplaza con la URL real de la imagen
            alt="Sebastián Ríos"
          />

          <div>
            <h2 className="text-xl font-semibold">Sebastián Ríos</h2>
            {creatorDesc ? <p className="text-sm text-gray-400">{creatorDesc}</p> : null}
            {/*
            <a href="#" className="mt-1 text-sm text-purple-400 hover:underline">
              Ver perfil
            </a>
            */}
          </div>
        </div>

        {/* Sección de objetivos */}
        <H2SimpleSection title="Despues de completar este curso, seras capaz de:">
          <CheckList items={course.courseLearnings} />
        </H2SimpleSection>
        <H2SimpleSection title="Acerca de este curso">
          <p className="text-sm font-normal text-white">{course.courseAbout}</p>
        </H2SimpleSection>

        {/* Botones */}
        {/*<div>
          <div className="mt-6 flex items-center space-x-4">
            <Button
              style={{
                backgroundColor: 'var(--color-primary-B-500)',
                borderColor: 'var(--color-primary-A-500)',
              }}
              className="rounded-md px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-700">
              Añadir al carrito
            </Button>
          </div>
          <div className="m-1 mt-4 flex space-x-2">
            <h3 className="mr-1"> Compartir : </h3>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              ✉
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              🌐
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              💬
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">
              🔗
            </a>
          </div>
        </div>*/}

        {creatorWhyLearning ? (
          <H2SimpleSection
            title={`¿Por qué aprender con ${course.creatorName}?`}
            titleVariant="textxl">
            <p className="text-sm font-normal text-white">{creatorWhyLearning}</p>
          </H2SimpleSection>
        ) : null}
        <H2SimpleSection title={`¿Para quién es este curso?`} titleVariant="textxl">
          <p className="text-sm font-normal text-white">{course.courseObjective}</p>
        </H2SimpleSection>
        <H2SimpleSection title={`Requisitos`} titleVariant="textxl">
          <CheckList items={course.courseRequirenments} />
        </H2SimpleSection>
        <H2SimpleSection title={`¿Qué incluye?`} titleVariant="textxl">
          <CheckList items={course.courseAdditions} />
        </H2SimpleSection>
      </div>
    </div>
  );
};
