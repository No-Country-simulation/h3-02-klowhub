import Image from 'next/image';
import FormField from '@core/components/FormField';

export default function CourseGeneralFormStep() {
  return (
    <div>
      <FormField
        id="courseTitle"
        label="Título del curso/lección"
        type="text"
        placeholder="Nombrá tu curso o lección"
      />
      <div className="flex gap-x-3 rounded-lg bg-white/10 p-5">
        <Image src="/svg/alert-circle.svg" width={24} height={24} alt="Circle alert icon" />
        <p>
          El contenido gratuito ofrece acceso limitado a características breves del contenido
          gratuito. El contenido premium desbloquea [principales beneficios del contenido de pago].
          Más información en nuestra.
        </p>
      </div>
    </div>
  );
}
