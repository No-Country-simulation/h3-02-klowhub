import { Tabs, TabsContent } from '@core/components/Tabs';
import TabListTrigger from '@core/components/Tabs/TabListTrigger';

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
    { label: tabGeneralText, value: 'general' },
    { label: tabDetailsText, value: 'details' },
    { label: tabModulesText, value: 'modules' },
    { label: tabPromotionText, value: 'promotion' },
  ];

  return (
    <section>
      <Tabs defaultValue="general">
        <TabListTrigger triggers={triggers} />
        <TabsContent value="genral"></TabsContent>
        <TabsContent value="details"></TabsContent>
        <TabsContent value="modules"></TabsContent>
        <TabsContent value="promotion"></TabsContent>
      </Tabs>
    </section>
  );
}
