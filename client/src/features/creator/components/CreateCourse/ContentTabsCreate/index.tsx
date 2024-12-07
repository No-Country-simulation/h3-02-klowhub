import { Tabs, TabsContent } from '@core/components/Tabs';
import ContentItemCreate from '../ContentItemCreate';
import ContentTabList from '../ContentTabListCreate';
import HeaderContentCreate from '../HeaderContentCreate';

interface ContentTabsProps {
  general: string;
  apps: string;
  courses: string;
  projects: string;
  headerName: string;
  headerAmount: string;
  headerPlatform: string;
  viewDetails: string;
}
const ContentTabsCreate = ({
  general,
  apps,
  courses,
  projects,
  headerName,
  headerAmount,
  headerPlatform,
  viewDetails,
}: ContentTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <ContentTabList general={general} apps={apps} courses={courses} projects={projects} />
      <HeaderContentCreate name={headerName} amount={headerAmount} platform={headerPlatform} />
      <TabsContent value="general" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItemCreate
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="apps" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItemCreate
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$450"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="courses" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItemCreate
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="projects" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItemCreate
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="mentors" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItemCreate
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabsCreate;
