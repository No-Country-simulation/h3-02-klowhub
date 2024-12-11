import Button from '@core/components/Button';
import { Link } from '@core/lib/i18nRouting';
import ExtraContentInfo from '../ExtraContentInfo/Index';

interface ContentExtraInfoCardProps {
  totalEarningsText: string;
  totalEarnings: string;
  publishedCoursesText: string;
  publishedCourses: string;
  transferredAppsText: string;
  transferredApps: string;
  mentoringHoursText: string;
  mentoringHours: string;
  viewDetails: string;
}

const ContentExtraInfoCard = ({
  mentoringHoursText,
  mentoringHours,
  publishedCoursesText,
  publishedCourses,
  transferredAppsText,
  transferredApps,
  totalEarningsText,
  totalEarnings,
  viewDetails,
}: ContentExtraInfoCardProps) => {
  return (
    <div className="hidden flex-1 basis-2/6 flex-col items-center justify-end gap-y-[1.215rem] min-[1080px]:flex">
      <ExtraContentInfo title={totalEarningsText} content={totalEarnings} />
      <ExtraContentInfo title={publishedCoursesText} content={publishedCourses} />
      <ExtraContentInfo title={transferredAppsText} content={transferredApps} />
      <ExtraContentInfo title={mentoringHoursText} content={mentoringHours} />
      <Button variant="ghost" asChild size="fit" className="h-8">
        <Link href="/creator/earnings">{viewDetails}</Link>
      </Button>
    </div>
  );
};

export default ContentExtraInfoCard;
