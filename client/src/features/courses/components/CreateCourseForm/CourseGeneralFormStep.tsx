import Button from '@core/components/Button';
import FormField from '@core/components/FormField';
import FormRadioGroup from '@core/components/FormRadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/components/Select';
import TiptapEditor from '@core/components/TiptapEditor';
import { useCreateCourseGeneralStep } from '@features/courses/hooks/useCreateCourseGeneralStep';
import { createCourseGeneralModel } from '@features/courses/models/createCourseGeneral';
import {
  CourseCompetence,
  CourseMonetizable,
  CoursePlatform,
  CourseType,
} from '@features/courses/models/enums/createCourseEnums';
import CreateCourseAlert from '../CreateCourseAlert';

export default function CourseGeneralFormStep() {
  const { handleSubmit, setDescription, generalStep } = useCreateCourseGeneralStep();

  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8" onSubmit={handleSubmit}>
      <FormField
        id="courseTitle"
        label="Título del curso/lección"
        name="courseTitle"
        type="text"
        placeholder="Nombrá tu curso o lección"
        className="max-w-md"
        defaultValue={generalStep.courseTitle}
      />
      <CreateCourseAlert>
        El contenido gratuito ofrece acceso limitado a características breves del contenido
        gratuito. El contenido premium desbloquea [principales beneficios del contenido de pago].
        Más información en nuestra.
      </CreateCourseAlert>
      <div className="flex max-w-[878px] flex-row gap-x-9">
        <FormRadioGroup
          defaultValue={generalStep.courseMonetizable || CourseMonetizable.FREE}
          title={'¿Qué tipo de contenido estás buscando: gratuito o premium?'}
          items={createCourseGeneralModel.courseMonetizable(['Gratuito', 'Pago'])}
        />
        <FormRadioGroup
          defaultValue={generalStep.courseType || CourseType.COURSE}
          title={'Seleccioná si vas a crear un curso o una lección.'}
          items={createCourseGeneralModel.courseType(['Curso', 'Leccion'])}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-white">Contá de qué trata, en no más de 3 líneas.</h3>
        <TiptapEditor
          onChange={html => {
            setDescription(html);
          }}
          className="max-w-3xl"
          defaultValue={generalStep.courseDescription}
        />
      </div>
      <div className="flex max-w-[878px] flex-row gap-x-32">
        <FormRadioGroup
          title={'Nivel de competencia'}
          defaultValue={generalStep.courseCompetence || CourseCompetence.BASIC}
          items={createCourseGeneralModel.courseCompetence(['Basico', 'Intermediato'])}
        />
        <FormRadioGroup
          title={'Plataforma'}
          defaultValue={generalStep.coursePlatform || CoursePlatform.POWER_APPS}
          items={createCourseGeneralModel.coursePlatform}
        />
        <div className="space-y-3">
          <h3 className="font-medium text-white">Elige el idioma del curso</h3>
          <Select name="courseLanguage" defaultValue={generalStep.courseLanguage || ''}>
            <SelectTrigger className="font-meddium w-[200px] border-primary-B-300 text-primary-B-300">
              <SelectValue placeholder="Selecciona el idioma" />
            </SelectTrigger>
            <SelectContent
              sideOffset={10}
              className="border-primary-B-300 bg-neutral-100/50 backdrop-blur-lg">
              <SelectItem value="es" className="text-white data-[state=checked]:text-primary-B-300">
                Español
              </SelectItem>
              <SelectItem value="en" className="text-white data-[state=checked]:text-primary-B-300">
                Ingles
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          Siguiente
        </Button>
      </div>
    </form>
  );
}
