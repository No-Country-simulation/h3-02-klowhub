'use client';

import { Tabs, TabsContent } from '@core/components/Tabs';
import TabListTrigger from '@core/components/Tabs/TabListTrigger';
import { useRouterQueryState } from '@core/hooks/useRouterQueryState';
import type { CourseFields } from '@features/courses/models/courseFields.type';
import { CreateCourseTriggers } from '@features/courses/models/enums/createCourseEnums';
import CourseDetailsFormStep from './CourseDetailsFormStep';
import CourseGeneralFormStep from './CourseGeneralFormStep';
import CourseModuleFormStep from './CourseModuleFormStep';

interface CreateCourseFormProps {
  fields: CourseFields;
  triggers: { label: string; value: CreateCourseTriggers; key: string }[];
  next: string;
}

export default function CreateCourseForm({ triggers, fields, next }: CreateCourseFormProps) {
  const [step, setActiveStep] = useRouterQueryState<[string]>(CreateCourseTriggers.KEY, [
    CreateCourseTriggers.GENERAL,
  ]);

  return (
    <section>
      <Tabs
        value={step?.[0]}
        onValueChange={val => {
          setActiveStep([val]);
        }}>
        <TabListTrigger className="max-w-3xl" triggers={triggers} />
        <TabsContent value={CreateCourseTriggers.GENERAL}>
          <CourseGeneralFormStep fields={fields.general} next={next} />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.DETAILS}>
          <CourseDetailsFormStep fields={fields.details} next={next} />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.MODULES}>
          <CourseModuleFormStep next={next} />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.PROMOTION}></TabsContent>
      </Tabs>
    </section>
  );
}
