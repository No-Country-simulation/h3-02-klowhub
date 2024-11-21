import Image from 'next/image';
import React from 'react';

export default function Footera() {
  return (
    <div className="flex flex-col justify-center gap-6 px-[10.5rem] py-10 text-sm font-normal text-white">
      <div className="flex flex-col items-center justify-center gap-12 min-[1025px]:items-start min-[1025px]:justify-start">
        <div className="flex flex-col gap-6 min-[790px]:flex-row min-[1025px]:gap-[4.5rem]">
          <ul className="flex flex-col gap-6">
            <h3>Categoria</h3>
            <li>
              <a href="#">Cursos</a>
            </li>
            <li>
              <a href="#">Aplicaciones</a>
            </li>
            <li>
              <a href="#">Vende un Curso</a>
            </li>
            <li>
              <a href="#">Vende una App</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-6">
            <h3>Acerca de</h3>
            <li>
              <a href="#">Instructores</a>
            </li>
            <li>
              <a href="#">Términos del Servicio</a>
            </li>
            <li>
              <a href="#">Política de Privacidad</a>
            </li>
          </ul>
          <ul className="flex flex-col gap-6">
            <h3>Soporte</h3>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
            <li>
              <a href="#">Foro</a>
            </li>
          </ul>
          <div className="mt-6 flex flex-col">
            <h3>Sigue a Klowhub</h3>
            <ul className="my-6 flex flex-row gap-6">
              <li>
                <a href="#">
                  <Image src="/svg/facebookIn.svg" width={13} height={13} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image src="/svg/twitter.svg" width={25} height={25} alt="facebook" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Image src="/svg/linkedin.svg" width={23} height={23} alt="facebook" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="w-full border-t-2 border-white/20" />
        <div className="col">
          <p>&copy; © KlowHub.</p>
        </div>
      </div>
    </div>
  );
}
