'use client';

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
import type { CourseGeneralFields } from '@features/courses/models/courseFields';
import { createCourseGeneralModel } from '@features/courses/models/createCourseGeneral';
import {
  CourseCompetence,
  CourseMonetizable,
  CoursePlatform,
  CourseType,
} from '@features/courses/models/enums/createCourseEnums';
import CreateCourseAlert from '../CreateCourseAlert';

interface CourseGeneralFormStepProps {
  fields: CourseGeneralFields;
  next: string;
}

export default function CourseGeneralFormStep({ fields, next }: CourseGeneralFormStepProps) {
  const { handleSubmit, setDescription, generalStep } = useCreateCourseGeneralStep();

  return (
    <form className="mt-5 space-y-12 rounded-lg bg-neutral-100 p-8" onSubmit={handleSubmit}>
      <FormField
        id="courseTitle"
        label={fields.title.label}
        name="courseTitle"
        type="text"
        placeholder={fields.title.placeholder}
        className="max-w-md"
        defaultValue={generalStep.courseTitle}
      />
      <CreateCourseAlert>{fields.alert}</CreateCourseAlert>
      <div className="flex max-w-[878px] flex-row gap-x-9">
        <FormRadioGroup
          name="courseMonetizable"
          defaultValue={generalStep.courseMonetizable || CourseMonetizable.FREE}
          title={fields.payment.label}
          items={createCourseGeneralModel.courseMonetizable([
            fields.payment.free,
            fields.payment.premium,
          ])}
        />
        <FormRadioGroup
          name="courseType"
          defaultValue={generalStep.courseType || CourseType.COURSE}
          title={fields.type.label}
          items={createCourseGeneralModel.courseType([fields.type.course, fields.type.lesson])}
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-medium text-white">{fields.description.label}</h3>
        <TiptapEditor
          onChange={html => {
            setDescription(html);
          }}
          className="max-w-3xl"
          defaultValue={generalStep.courseDescription}
          placeholder={fields.description.placeholder}
        />
      </div>
      <div className="flex max-w-[878px] flex-row gap-x-32">
        <FormRadioGroup
          name="courseCompetence"
          title={fields.level.label}
          defaultValue={generalStep.courseCompetence || CourseCompetence.BASIC}
          items={createCourseGeneralModel.courseCompetence([fields.level.basic, fields.level.mid])}
        />
        <FormRadioGroup
          name="coursePlatform"
          title={fields.platform.label}
          defaultValue={generalStep.coursePlatform || CoursePlatform.POWER_APPS}
          items={createCourseGeneralModel.coursePlatform}
        />
        <div className="space-y-3">
          <h3 className="font-medium text-white">{fields.language.label}</h3>
          <Select name="courseLanguage" defaultValue={generalStep.courseLanguage || ''}>
            <SelectTrigger className="font-meddium w-[200px] border-primary-B-300 text-primary-B-300">
              <SelectValue placeholder={fields.language.placeholder} />
            </SelectTrigger>
            <SelectContent
              sideOffset={10}
              className="border-primary-B-300 bg-neutral-100/50 backdrop-blur-lg">
              <SelectItem value="es" className="text-white data-[state=checked]:text-primary-B-300">
                Español
              </SelectItem>
              <SelectItem value="en" className="text-white data-[state=checked]:text-primary-B-300">
                English
              </SelectItem>
              <SelectItem value="pt" className="text-white data-[state=checked]:text-primary-B-300">
                Português
              </SelectItem>
              <SelectItem value="fr" className="text-white data-[state=checked]:text-primary-B-300">
                Français
              </SelectItem>
              <SelectItem value="it" className="text-white data-[state=checked]:text-primary-B-300">
                Italiano
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="inline-flex w-full">
        <Button variant="default" className="ms-auto px-11" type="submit" size="default">
          {next}
        </Button>
      </div>
    </form>
  );
}
