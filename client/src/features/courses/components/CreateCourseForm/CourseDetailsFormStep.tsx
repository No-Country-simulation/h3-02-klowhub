import Button from '@core/components/Button';
import FileUpload from '@core/components/FileUpload/Index';
import FormOutComes from '@core/components/FormOutComes';
import { useCreateCourseDetailsStep } from '@features/courses/hooks/useCreateCourseDetailsStep';
import CreateFormPart from '../CreateFormPart';

export default function CourseDetailsFormStep() {
  const { handleSubmit, courseDetailsStep, coursePoster, setResources } =
    useCreateCourseDetailsStep();
  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8" onSubmit={handleSubmit}>
      <CreateFormPart title="¿Decinos que van a aprender tus estudiantes al finalizar el curso?">
        <FormOutComes defaultValue={courseDetailsStep.courseLearnings} name="courseLearnings" />
      </CreateFormPart>
      <CreateFormPart title="Requisitos previos">
        <FormOutComes
          defaultValue={courseDetailsStep.courseRequirements}
          name="courseRequirements"
        />
      </CreateFormPart>
      <CreateFormPart title="Haz un listado de los beneficios que ofrece el curso">
        <FormOutComes defaultValue={courseDetailsStep.courseBenefits} name="courseBenefits" />
      </CreateFormPart>
      <CreateFormPart title="Subi una imagen de portada para el curso" className="max-w-lg">
        <FileUpload
          name="coursePoster"
          firstText="Sube una imagen de portada para el curso"
          secondText="Arrastre o haga click aqui para subir su imagen"
          defaultValue={coursePoster}
          onPreviewSelect={preview => {
            setResources(prev => ({
              ...prev,
              coursePoster: preview as string | undefined,
            }));
          }}
        />
      </CreateFormPart>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          Siguiente
        </Button>
      </div>
    </form>
  );
}
