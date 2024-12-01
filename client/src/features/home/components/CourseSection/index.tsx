import { useTranslations } from 'next-intl';
import Button from '@core/components/Button';
import { Link } from '@core/lib/i18nRouting';
import CourseCard from '@features/home/components/CourseCard';

const Page = () => {
  const pt = useTranslations<'Platform'>('Platform');
  const ct = useTranslations<'Common'>('Common');

  return (
    <div className="pt-8">
      <div className="mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">{pt('recocourseTitle')}</h1>
          <p className="text-gray-300">{pt('recocourseDesc')}</p>
        </div>
        <div className="grid grid-cols-1 items-center justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            title="Dominando el desarrollo de aplicaciones con AppSheet"
            description="Conviértete en un experto en AppSheetHub y aprende a crear aplicaciones sin escribir una sola línea de código."
            price="80.000"
            rating={3.5}
            reviews={136}
            textButton="AppSheet"
            tags={['Logistica', 'Optimización', 'Inventarios']}
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/images/appsheet_logo.png"
            categoria="Lección"
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />

          <CourseCard
            title="Automatiza tus procesos con AppSheet"
            description="Aprende a simplificar y automatizar tareas rutinarias utilizando las herramientas intuitivas de AppSheetHub."
            price="25.000"
            rating={3.5}
            reviews={136}
            textButton="Power Apps"
            tags={['Logistica', 'Optimización', 'Inventarios']}
            imageSrc="/images/mocks/course_mock2.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            emoji="/svg/powerapp.svg"
            categoria="Curso"
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />

          <CourseCard
            title="Creación de aplicaciones empresariales"
            description="Descubre cómo desarrollar aplicaciones personalizadas que optimicen los procesos de tu empresa"
            price="00.00"
            rating={3.5}
            reviews={136}
            tags={['Logistica', 'Retail', 'Inventarios']}
            imageSrc="/images/mocks/course_mock3png.png" // Ruta de la imagen
            imageAlt="Portada del curso de Next.js" // Descripción opcional
            textButton="AppSheet"
            emoji="/images/appsheet_logo.png"
            categoria="Curso"
            viewDetails={ct('viewDetails')}
            addToCart={ct('addToCart')}
          />
        </div>
        <div className="mx-auto mt-8 w-full max-w-72">
          <Button variant="outline" asChild size="full" className="py-6">
            <Link href="/courses">{ct('viewMore')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
