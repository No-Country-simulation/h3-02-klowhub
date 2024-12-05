import { Tabs, TabsContent } from '@core/components/Tabs';
import TabListTrigger from '@core/components/Tabs/TabListTrigger';
import { CreateCourseTriggers } from '@features/courses/enums/createCourseEnums';
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
  const triggers = [
    { label: tabGeneralText, value: CreateCourseTriggers.GENERAL },
    { label: tabDetailsText, value: CreateCourseTriggers.DETAILS },
    { label: tabModulesText, value: CreateCourseTriggers.MODULES },
    { label: tabPromotionText, value: CreateCourseTriggers.PROMOTION },
  ];

  return (
    <form>
      <Tabs defaultValue={CreateCourseTriggers.GENERAL}>
        <TabListTrigger className="max-w-3xl" triggers={triggers} />
        <TabsContent value={CreateCourseTriggers.GENERAL}>
          <CourseGeneralFormStep />
        </TabsContent>
        <TabsContent value={CreateCourseTriggers.DETAILS}></TabsContent>
        <TabsContent value={CreateCourseTriggers.MODULES}></TabsContent>
        <TabsContent value={CreateCourseTriggers.PROMOTION}></TabsContent>
      </Tabs>
    </form>
  );
}
