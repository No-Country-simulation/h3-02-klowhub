import { Tabs, TabsContent, TabsList, TabsTrigger } from '@core/components/Tabs/Index';
import HeaderContent from '../ContentHeader/Index';
import ContentItem from '../ContentItem/Index';

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
      <TabsList className="w-full min-w-[438px] overflow-hidden min-[820px]:max-w-[40%]">
        <TabsTrigger value="general">{general}</TabsTrigger>
        <TabsTrigger value="apps">{apps}</TabsTrigger>
        <TabsTrigger value="courses">{courses}</TabsTrigger>
        <TabsTrigger value="projects">{projects}</TabsTrigger>
        <TabsTrigger value="mentors">{mentors}</TabsTrigger>
      </TabsList>
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
