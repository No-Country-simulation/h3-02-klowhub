import Image from 'next/image';
import styles from './CardInquiries.module.css'; // Asegúrate de que la ruta sea correcta

export interface CardInquiriesProps {
  title: string;
  description: string;
  nombre: string;
  fecha: string;
  estado: string;
  imageUrl: string;
  imageUrlLogo: string;
  nameapp: string;
  imageEstado: string;
}

export default function CardInquiries({
  title,
  description,
  nombre,
  fecha,
  estado,
  imageUrl,
  imageUrlLogo,
  nameapp,
  imageEstado,
}: CardInquiriesProps) {
  return (
    <div className={`${styles.gridContainer} max-w-[400px] rounded-lg bg-white/10 shadow-md`}>
      <div className={`${styles.titleDescription} flex flex-col justify-center`}>
        <h3 className="font-inter decoration-none text-left text-sm font-semibold leading-5 tracking-tighter text-white underline-offset-4">
          {title}
        </h3>
        <p className="font-inter decoration-none text-left text-sm font-semibold leading-5 tracking-tighter text-white underline-offset-4">
          {description}
        </p>
      </div>

      <div className={`${styles.firstRowContainer} `}>
        <div className={`${styles.photoName} flex items-center md:justify-self-center`}>
          <Image
            src={imageUrl}
            width={50}
            height={50}
            alt={nombre}
            className="w-50p h-50px mr-[24px] rounded-full bg-white object-cover"
          />
          <p className="text-left text-sm text-white">{nombre}</p>
        </div>

        <div className={`${styles.fecha} flex items-center md:justify-self-center`}>
          <p className="text-left text-sm font-semibold text-white">{fecha}</p>
        </div>

        <div
          className={`${styles.logoState} flex items-center rounded-lg bg-primary-B-500/10 md:justify-self-center`}>
          <Image src={imageUrlLogo} width={25} height={25} alt={nombre} className="md:mr-[9px]" />
          <p className="font-inter decoration-none text-left text-xs font-semibold leading-5 tracking-tighter text-white underline-offset-4">
            {nameapp}
          </p>
        </div>

        <div className={`${styles.state} flex items-center md:justify-self-center`}>
          <span
            className={`flex flex-row rounded-xl px-2 py-1 text-xs font-semibold ${estado === 'completed' ? 'bg-white text-success-400' : 'bg-yellow-200 text-yellow-600'}`}>
            <Image
              src={imageEstado}
              alt={nombre}
              width={20}
              height={20}
              className="justify-self-center p-1"
            />{' '}
            <p className="flex items-center p-1">{estado}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
