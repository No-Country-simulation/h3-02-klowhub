import { Tabs, TabsContent } from '@core/components/Tabs';
import HeaderContent from '../ContentHeader/Index';
import ContentItem from '../ContentItem/Index';
import ContentTabList from '../ContentTabList/Index';

interface ContentTabsProps {
  general: string;
  apps: string;
  courses: string;
  projects: string;
  mentors: string;
  headerName: string;
  headerAmount: string;
  headerType: string;
  headerState: string;
  headerPlatform: string;
  viewDetails: string;
}

const ContentTabs = ({
  general,
  apps,
  courses,
  projects,
  mentors,
  headerName,
  headerAmount,
  headerType,
  headerState,
  headerPlatform,
  viewDetails,
}: ContentTabsProps) => {
  return (
    <Tabs defaultValue="general" className="w-full">
      <ContentTabList
        general={general}
        apps={apps}
        courses={courses}
        projects={projects}
        mentors={mentors}
      />
      <HeaderContent
        name={headerName}
        amount={headerAmount}
        type={headerType}
        state={headerState}
        platform={headerPlatform}
      />
      <TabsContent value="general" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItem
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            type="Curso"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="apps" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItem
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$450"
            type="Apps"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="courses" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItem
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            type="Curso"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="projects" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItem
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            type="Projects"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
      <TabsContent value="mentors" className="space-y-3">
        {[1, 2, 3, 4, 5].map((item, i) => (
          <ContentItem
            key={i}
            profile="/images/mocks/avatar_mock1.png"
            name="Nombre del cliente"
            price="$650"
            type="Mentors"
            state="Pendiente"
            details={viewDetails}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
