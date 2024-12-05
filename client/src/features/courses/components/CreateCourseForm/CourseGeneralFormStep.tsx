import Image from 'next/image';
import FormField from '@core/components/FormField';
import { RadioGroup, RadioGroupItem } from '@core/components/RadioGroup';
import TiptapEditor from '@core/components/TiptapEditor';
import { CourseMonetizable, CourseType } from '@features/courses/enums/createCourseEnums';

export default function CourseGeneralFormStep() {
  return (
    <div className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8">
      <FormField
        id="courseTitle"
        label="Título del curso/lección"
        type="text"
        placeholder="Nombrá tu curso o lección"
        className="max-w-md"
      />
      <div className="flex w-full min-w-[788px] max-w-2xl gap-x-3 rounded-lg bg-white/10 p-5">
        <Image src="/svg/alert-circle.svg" width={24} height={24} alt="Circle alert icon" />
        <p className="text-white">
          El contenido gratuito ofrece acceso limitado a características breves del contenido
          gratuito. El contenido premium desbloquea [principales beneficios del contenido de pago].
          Más información en nuestra.
        </p>
      </div>
      <div className="flex flex-row gap-x-9">
        <div className="space-y-3">
          <span className="font-medium text-white">
            ¿Qué tipo de contenido estás buscando: gratuito o premium?
          </span>
          <RadioGroup defaultValue={CourseMonetizable.FREE} name="courseMonetizable">
            <div className="inline-block space-x-4 text-white">
              <RadioGroupItem value={CourseMonetizable.FREE} id="radio-free" />
              <label htmlFor="radio-free">Gratuito</label>
            </div>
            <div className="inline-block space-x-4 text-white">
              <RadioGroupItem value={CourseMonetizable.PAYMENT} disabled id="payment-free" />
              <label htmlFor="payment-free">Pago</label>
            </div>
          </RadioGroup>
        </div>
        <div className="space-y-3">
          <label className="font-medium text-white">
            Seleccioná si vas a crear un curso o una lección.
          </label>
          <RadioGroup defaultValue={CourseType.COURSE} name="courseMonetizable">
            <div className="inline-block space-x-4 text-white">
              <RadioGroupItem value={CourseType.COURSE} id="course-free" />
              <label htmlFor="course-free">Curso</label>
            </div>
            <div className="inline-block space-x-4 text-white">
              <RadioGroupItem value={CourseType.LESSON} disabled id="lesson-free" />
              <label htmlFor="lesson-free">Leccion</label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="space-y-3">
        <label className="font-medium text-white">Contá de qué trata, en no más de 3 líneas.</label>
        <TiptapEditor name="desc" className="max-w-3xl" />
      </div>
    </div>
  );
}
