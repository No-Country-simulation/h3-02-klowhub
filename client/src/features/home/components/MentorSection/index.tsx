import { useTranslations } from 'next-intl';
import Button from '@core/components/Button';
import { Link } from '@core/lib/i18nRouting';
import CardTeacher from '@features/home/components/MentorCard';

const MentorSection = () => {
  const ct = useTranslations<'Common'>('Common');

  return (
    <section className="mx-auto w-full">
      <div className="grid grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardTeacher
          title="Martin Fernandez"
          price="6"
          reviews={136}
          textButton="AppShet"
          imageSrc="/images/mocks/mentor_mock1.png" // Ruta de la imagen
          imageAlt="Portada del curso de Next.js" // Descripción opcional
          emoji="/images/appsheet_logo.png"
          urlPais="/svg/argentina.svg"
          sessions="50"
          idioma="Español"
        />

        <CardTeacher
          title="Laura Sánchez"
          price="6"
          reviews={136}
          textButton="Power Apps"
          imageSrc="/images/mocks/mentor_mock2.png" // Ruta de la imagen
          imageAlt="Portada del curso de Next.js" // Descripción opcional
          emoji="/svg/powerapp.svg"
          urlPais="/svg/argentina.svg"
          sessions="50"
          idioma="Español"
        />

        <CardTeacher
          title="Marco Rojas"
          price="6"
          reviews={136}
          imageSrc="/images/mocks/mentor_mock3.png" // Ruta de la imagen
          imageAlt="Portada del curso de Next.js" // Descripción opcional
          textButton="AppSheet"
          emoji="/images/appsheet_logo.png"
          urlPais="/svg/argentina.svg"
          sessions="50"
          idioma="Español"
        />

        <CardTeacher
          title="Nora Martínez"
          price="6"
          reviews={123}
          textButton="AppSheet"
          imageSrc="/images/mocks/mentor_mock4.png" // Ruta de la imagen
          imageAlt="Portada del curso de Next.js" // Descripción opcional
          emoji="/images/appsheet_logo.png"
          urlPais="/svg/argentina.svg"
          sessions="50"
          idioma="Español"
        />
      </div>

      <div className="mx-auto mt-8 w-full max-w-72">
        <Button variant="outline" asChild size="full" className="py-6">
          <Link href="/mentors">{ct('viewMore')}</Link>
        </Button>
      </div>
    </section>
  );
};

export default MentorSection;
