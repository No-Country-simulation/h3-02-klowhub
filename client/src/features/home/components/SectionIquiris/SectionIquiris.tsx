import { useTranslations } from 'next-intl';
import CardInquiries from '../CardInquiries/CardInquiries';
import HeadInquiries from '../HeaderInquiries/HeadInquiries';

export default function SectionIquiris() {
  const t = useTranslations<'Platform'>('Platform');
  return (
    <section className="flex flex-col gap-[24px] text-xl">
      <h2 className="text-white">{t('latestInquiriesTitle')}</h2>
      <div className="flex min-w-full flex-row gap-[25px] p-12 min-[730px]:flex-col min-[730px]:bg-neutral-100">
        <HeadInquiries />
        <CardInquiries
          title="Consulta de Ejemplo"
          description="Esta es una breve descripción de la consulta."
          nombre="Juan Pérez"
          fecha="2024-11-14"
          estado="completed"
          imageUrl="/images/mocks/avatar_mock1.png"
          imageUrlLogo="/images/appsheet_logo.png"
          nameapp="Appsheet"
          imageEstado="/svg/checkCircle.svg"
        />
        <CardInquiries
          title="Consulta de Ejemplo"
          description="Esta es una breve descripción de la consulta."
          nombre="Juan Pérez"
          fecha="2024-11-14"
          estado="completed"
          imageUrl="/images/mocks/avatar_mock1.png"
          imageUrlLogo="/images/appsheet_logo.png"
          nameapp="Appsheet"
          imageEstado="/svg/checkCircle.svg"
        />
        <CardInquiries
          title="Consulta de Ejemplo"
          description="Esta es una breve descripción de la consulta."
          nombre="Juan Pérez"
          fecha="2024-11-14"
          estado="completed"
          imageUrl="/images/mocks/avatar_mock1.png"
          imageUrlLogo="/images/appsheet_logo.png"
          nameapp="Appsheet"
          imageEstado="/svg/checkCircle.svg"
        />
        <CardInquiries
          title="Consulta de Ejemplo"
          description="Esta es una breve descripción de la consulta."
          nombre="Juan Pérez"
          fecha="2024-11-14"
          estado="completed"
          imageUrl="/images/mocks/avatar_mock1.png"
          imageUrlLogo="/images/appsheet_logo.png"
          nameapp="Appsheet"
          imageEstado="/svg/checkCircle.svg"
        />
        <CardInquiries
          title="Consulta de Ejemplo"
          description="Esta es una breve descripción de la consulta."
          nombre="Juan Pérez"
          fecha="2024-11-14"
          estado="completed"
          imageUrl="/images/mocks/avatar_mock1.png"
          imageUrlLogo="/images/appsheet_logo.png"
          nameapp="Appsheet"
          imageEstado="/svg/checkCircle.svg"
        />
      </div>
    </section>
  );
}
