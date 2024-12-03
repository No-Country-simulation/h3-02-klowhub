import Image from 'next/image';
import React from 'react';
import Button from '@root/src/core/components/Button';

export const MainContent = () => {
  return (
    <div className="w-full text-white lg:w-5/6 lg:pr-8">
      <h2 className="mb-4 text-2xl font-bold">Gestión de inventarios con Power Apps</h2>
      <p className="mb-4 text-base">
        Descubre cómo transformar ideas en aplicaciones funcionales sin necesidad de programar,
        utilizando Power Apps. Este curso te guiará paso a paso para que aprendas a crear
        aplicaciones personalizadas que se adapten a tus necesidades, optimizando procesos y
        mejorando la eficiencia en tu trabajo o negocio.
      </p>
      <div className="mb-6 flex items-center">
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
      </div>

      {/* Aqui el video Player */}

      {/* Header con información del perfil */}
      <div className="mx-auto rounded-lg bg-gray-800 p-6 text-white shadow-md">
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
            <p className="text-sm text-gray-400">
              Experto en desarrollo de aplicaciones no-code con más de 5 años de experiencia en
              AppSheet y Power Apps, ayudando a empresas y emprendedores a optimizar sus procesos de
              manera eficiente y accesible.
            </p>
            <a href="#" className="mt-1 text-sm text-purple-400 hover:underline">
              Ver perfil
            </a>
          </div>
        </div>

        {/* Sección de objetivos */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Después de completar este curso, serás capaz de</h3>
          <ul className="ml-2 mt-4 space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Crear aplicaciones personalizadas
              desde cero utilizando Power Apps.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Automatizar tareas y optimizar
              procesos en tu entorno laboral o personal.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Diseñar interfaces de usuario
              intuitivas y funcionales sin necesidad de conocimientos en programación.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Integrar tus aplicaciones con otras
              herramientas y plataformas para maximizar su potencial.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Resolver problemas comunes y mejorar
              la eficiencia de tus proyectos mediante soluciones no-code.
            </li>
          </ul>
        </div>

        {/* Descripción del curso */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Acerca de este curso</h3>
          <p className="mt-4 text-sm text-gray-300">
            Este curso está diseñado para quienes desean aprender a crear aplicaciones
            personalizadas de manera rápida y sencilla, sin necesidad de conocimientos previos en
            programación. A lo largo de las lecciones, explorarás las funcionalidades clave de Power
            Apps, desde los conceptos básicos hasta técnicas avanzadas, que te permitirán
            desarrollar soluciones adaptadas a tus necesidades. Con ejemplos prácticos y
            explicaciones claras, te guiaré en el proceso de convertir tus ideas en aplicaciones
            funcionales que mejoren la productividad y eficiencia de tus proyectos.
          </p>
        </div>

        {/* Botones */}
        <div>
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
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">¿Por qué aprender con Sebastián?</h3>
          <p className="mt-4 text-sm text-gray-300">
            Sebastián Ríos es un apasionado del desarrollo no-code, con más de 5 años de experiencia
            en AppSheet y un enfoque práctico y accesible para la enseñanza. Ha ayudado a cientos de
            profesionales y emprendedores a transformar sus ideas en aplicaciones exitosas,
            simplificando procesos y mejorando la productividad. Su metodología se centra en
            ejemplos reales y soluciones prácticas, lo que te permitirá aplicar lo aprendido de
            inmediato en tus propios proyectos. Aprender con Sebastián significa adquirir
            habilidades valiosas de la mano de un experto comprometido con tu éxito.{' '}
          </p>

          <h3 className="mt-4 text-xl font-semibold">¿Para quién es este curso?</h3>
          <p className="mt-4 text-sm text-gray-300">
            Este curso está dirigido a emprendedores, profesionales y cualquier persona interesada
            en crear aplicaciones personalizadas sin necesidad de programar. Si buscas optimizar
            procesos, mejorar la eficiencia en tu trabajo o simplemente explorar nuevas herramientas
            tecnológicas, este curso es ideal para ti. No se requiere experiencia previa en
            desarrollo, ya que te guiaré desde lo más básico hasta técnicas avanzadas, asegurando
            que puedas aplicar lo aprendido en proyectos reales, independientemente de tu nivel de
            conocimientos.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Requisitos</h3>
          <ul className="ml-2 mt-4 space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Crear aplicaciones personalizadas
              desde cero utilizando Power Apps.
            </li>
          </ul>
          <h3 className="mt-4 text-xl font-semibold">¿ Qué incluye ?</h3>
          <ul className="ml-2 mt-4 space-y-2 text-sm text-gray-300">
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Crear aplicaciones personalizadas
              desde cero utilizando Power Apps.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Automatizar tareas y optimizar
              procesos en tu entorno laboral o personal.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Diseñar interfaces de usuario
              intuitivas y funcionales sin necesidad de conocimientos en programación.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Integrar tus aplicaciones con otras
              herramientas y plataformas para maximizar su potencial.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-green-500">✔</span> Resolver problemas comunes y mejorar
              la eficiencia de tus proyectos mediante soluciones no-code.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
