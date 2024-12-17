import Image from 'next/image';
import React from 'react';
import { Link } from '@core/lib/i18nRouting';
import { getPlatformLogo } from '@core/services/getPlatformLogo';
import type { CreatorCourseType } from '@features/courses/schemas/creator-course.schemas';
import Badge from '@root/src/core/components/Badge/Index';
import Button from '@root/src/core/components/Button';

interface SectionRigthProps {
  creator: CreatorCourseType;
  platform: string;
  isBuy?: boolean;
  courseId: string | number;
}
//
export const SectionRigth = ({ creator, platform, isBuy, courseId }: SectionRigthProps) => {
  return (
    <div className="w-full lg:ml-9 lg:w-3/12">
      {/* Sobre el instructor */}
      <div className="mb-6 rounded-lg bg-[#323235] p-6 shadow-md">
        <div className="flex items-center space-x-4">
          {/* Imagen del perfil */}
          <div className="size-16">
            <Image
              className="w-full rounded-full object-cover"
              src={creator.image}
              alt="Sebastian Rios"
              width={45}
              height={45}
            />
          </div>
          {/* Información del usuario */}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{creator.fristName}</span>
              <Badge text="PRO" variant={creator.membership as 'pro'} />
            </div>
            <span className="text-sm text-gray-400">{creator.title}</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-4">
          {/* Calificación */}
          <div className="flex items-center justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8 text-primary-B-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.367 4.223a1 1 0 00.95.69h4.456c.969 0 1.371 1.24.588 1.81l-3.607 2.622a1 1 0 00-.364 1.118l1.367 4.223c.3.921-.755 1.688-1.54 1.118l-3.607-2.622a1 1 0 00-1.176 0l-3.607 2.622c-.784.57-1.84-.197-1.54-1.118l1.367-4.223a1 1 0 00-.364-1.118L2.98 9.65c-.783-.57-.38-1.81.588-1.81h4.456a1 1 0 00.95-.69l1.367-4.223z"
              />
            </svg>
            <span className="ml-2 mr-4 text-gray-300">Calificación del instructor:</span>
            <span className="text-gray-300">{5}</span>
          </div>
          {/* Reseñas */}
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8 text-primary-B-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8a2 2 0 012-2h2m10-4H7a2 2 0 00-2 2v4a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2z"
              />
            </svg>
            <span className="ml-2 text-gray-300">
              {creator.rating} ({creator.reviews} Reseñas)
            </span>
          </div>
          {/* Estudiantes */}
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 26 26"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8 text-primary-B-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-3.5 2m3.5-2l3.5 2"
              />
            </svg>
            <span className="ml-2 text-gray-300">{5} estudiantes</span>
          </div>
          {/* Cursos */}
          <div className="mt-2 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-8 text-primary-B-500">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>
            <span className="ml-2 text-gray-300">{5} Cursos</span>
          </div>
        </div>
      </div>

      <Button variant="neutral" size="full" asChild className="size-full bg-[#2D3748]">
        <div className="mb-6 flex items-center rounded-lg bg-[#323235] px-4 py-3 shadow-md">
          <Image
            src={getPlatformLogo(platform)}
            width={48}
            height={48}
            alt="AppSheet"
            className="size-6"
          />
          <span className="ml-3 text-xl text-white">{platform}</span>
        </div>
      </Button>

      {/* Programa del curso */}
      <div className="rounded-lg bg-[#323235] p-6 shadow-md">
        <h3 className="mb-4 text-lg font-bold text-white">Programa del curso</h3>
        <ul className="space-y-4">
          {['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4'].map((module, index) => (
            <li key={index} className="list-none border-t border-gray-600 pt-2">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-white">
                  {module}
                  <span className="text-purple-400 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <div className="mt-2 pl-4 text-sm text-gray-300">
                  <p>Lección 1: Introducción</p>
                  <p>Lección 2: Configuración de herramientas</p>
                  <p>Lección 3: Práctica guiada</p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        {isBuy ? (
          <Button asChild size={'lg'} className="w-full rounded-lg text-white">
            <Link href={`/courses/watch/${courseId}`}>Ver curso</Link>
          </Button>
        ) : (
          <>
            <Button size={'lg'} className="mb-4 w-full text-white">
              Comprar curso
            </Button>

            <Button variant="outline" size={'lg'} className="w-full rounded-lg">
              Añadir al carrito
            </Button>
          </>
        )}
      </div>

      {/* CARD  50 %
      <div className="border-primary-A-300 bg-[#1A202C] shadow-lg mt-6 p-6 border rounded-lg w-full text-white">
        <h2 className="mb-4 font-semibold text-sm">
          Con la compra de este curso tiene un 50% OFF en la compra de: Aplicación para seguimiento
          de proyectos
        </h2>
        <div className="bg-[#2D3748] shadow-md rounded-lg overflow-hidden">
          <Image
            src="/images/mocks/course_mock4png.png" // Cambia esta ruta por la imagen real
            alt="Aplicación para seguimiento de proyectos"
            width={800}
            height={200}
            className="rounded-t-lg w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="mb-2 font-semibold text-lg">Aplicación para seguimiento de proyectos</h3>
            <p className="mb-4 text-gray-400 text-sm">
              Una aplicación para almacenar información de proyectos y comunicaciones.
            </p>
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="flex items-center text-yellow-400">
                4.1
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="ml-1 size-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.9 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </span>
              <span>(74)</span>
            </div>
            <p className="mb-4 font-bold text-2xl">$38.700</p>

            <div className="flex flex-col items-start gap-2">
              <Button
                size="fit"
                style={{
                  backgroundColor: 'var(--color-primary-B-500)',
                  borderColor: 'var(--color-primary-A-500)',
                }}
                className="flex justify-center items-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium text-white">
                <Image src="/svg/cart.svg" alt="Carrito" width="20" height="20" className="mr-2" />
                Añadir al carrito
              </Button>
              <a href="#" className="my-2 ml-3 text-center text-purple-400 text-sm hover:underline">
                Ver detalles
              </a>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
};
