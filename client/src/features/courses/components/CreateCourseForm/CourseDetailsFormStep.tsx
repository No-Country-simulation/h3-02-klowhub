import Button from '@core/components/Button';
import FileUpload from '@core/components/FileUpload/Index';
import FormOutComes from '@core/components/FormOutComes';
import { useCreateCourseDetailsStep } from '@features/courses/hooks/useCreateCourseDetailsStep';
import type { CourseDetailsFields } from '@features/courses/models/courseFields';
import CreateFormPart from '../CreateFormPart';

interface CourseDetailsFormStepProps {
  fields: CourseDetailsFields;
  next: string;
}

export default function CourseDetailsFormStep({ fields, next }: CourseDetailsFormStepProps) {
  const { handleSubmit, courseDetailsStep, setCourseCreation } = useCreateCourseDetailsStep();
  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8" onSubmit={handleSubmit}>
      <CreateFormPart title={fields.learnings.label}>
        <FormOutComes
          emptyMessage={fields.learnings.placeholder}
          defaultValue={courseDetailsStep?.courseLearnings}
          name="courseLearnings"
        />
      </CreateFormPart>
      <CreateFormPart title={fields.requirements.label}>
        <FormOutComes
          emptyMessage={fields.requirements.placeholder}
          defaultValue={courseDetailsStep?.courseRequirements}
          name="courseRequirements"
        />
      </CreateFormPart>
      <CreateFormPart title={fields.benefits.label}>
        <FormOutComes
          emptyMessage={fields.benefits.placeholder}
          defaultValue={courseDetailsStep?.courseBenefits}
          name="courseBenefits"
        />
      </CreateFormPart>
      <CreateFormPart title={fields.poster.label} className="max-w-lg">
        <FileUpload
          name="coursePoster"
          firstText={fields.poster.placeholder}
          secondText={fields.poster.info}
          defaultValue={courseDetailsStep?.coursePoster}
          onPreviewSelect={preview => {
            setCourseCreation(prev => ({
              ...prev,
              courseDetailsStep: {
                ...prev.courseDetailsStep,
                coursePoster: preview as string | undefined,
              },
            }));
          }}
        />
      </CreateFormPart>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          {next}
        </Button>
      </div>
    </form>
  );
}
