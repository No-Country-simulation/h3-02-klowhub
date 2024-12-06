'use client';

import { useAtom } from 'jotai';
import { Tabs, TabsContent } from '@core/components/Tabs';
import TabListTrigger from '@core/components/Tabs/TabListTrigger';
import { CreateCourseTriggers } from '@features/courses/models/enums/createCourseEnums';
import { courseCreationStore } from '@features/courses/store/courseCreationStore';
import CourseDetailsFormStep from './CourseDetailsFormStep';
import CourseGeneralFormStep from './CourseGeneralFormStep';

interface CreateCourseFormProps {
  tabGeneralText: string;
  tabDetailsText: string;
  tabModulesText: string;
  tabPromotionText: string;
}

export default function CreateCourseForm({
  tabDetailsText,
  tabGeneralText,
  tabModulesText,
  tabPromotionText,
}: CreateCourseFormProps) {
  const [activeStep, setActiveAtom] = useAtom(courseCreationStore);
  const triggers = [
    { label: tabGeneralText, value: CreateCourseTriggers.GENERAL },
    { label: tabDetailsText, value: CreateCourseTriggers.DETAILS },
    { label: tabModulesText, value: CreateCourseTriggers.MODULES },
    { label: tabPromotionText, value: CreateCourseTriggers.PROMOTION },
  ];

  return (
    <section>
      <Tabs
        value={activeStep.activeStep}
        onValueChange={val =>
          setActiveAtom(prev => ({ ...prev, activeStep: val as CreateCourseTriggers }))
        }>
        <TabListTrigger className="max-w-3xl" triggers={triggers} />
        <TabsContent value={CreateCourseTriggers.GENERAL}>
          <CourseGeneralFormStep />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.DETAILS}>
          <CourseDetailsFormStep />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.MODULES}></TabsContent>
        <TabsContent value={CreateCourseTriggers.PROMOTION}></TabsContent>
      </Tabs>
    </section>
  );
}
