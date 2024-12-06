import Image from 'next/image';

interface ContentItemProps {
  type: string;
  name: string;
  price: string;
  state: string;
  details: string;
  profile: string;
}

const ContentItem = ({ profile, name, type, price, state, details }: ContentItemProps) => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-md min-[820px]:grid min-[820px]:grid-cols-6 min-[820px]:gap-6">
      <div className="col-span-2 hidden items-center justify-center gap-4 min-[820px]:flex">
        <Image
          src={profile}
          width={50}
          height={50}
          alt="Profile image"
          className="max-w-full rounded-full object-cover object-center"
        />{' '}
        {name}
      </div>
      <div className="flex h-8 items-center justify-between gap-4 rounded-lg bg-white/10 px-5 py-6 min-[820px]:h-auto min-[820px]:justify-center min-[820px]:rounded-none min-[820px]:bg-transparent min-[820px]:p-0">
        <span className="inline-flex min-[820px]:hidden">Monto</span>
        {price}
      </div>
      <div className="flex h-8 items-center justify-between gap-4 rounded-lg bg-white/10 px-5 py-6 min-[820px]:h-auto min-[820px]:justify-center min-[820px]:rounded-none min-[820px]:bg-transparent min-[820px]:p-0">
        <span className="inline-flex min-[820px]:hidden">Tipo</span>
        <div className="flex h-fit select-none items-center justify-center gap-x-2 rounded-2xl border border-success-200 bg-success-300/15 px-3 py-[6px] font-bold text-success-200">
          <Image src="/svg/checkCircleLight.svg" width={16} height={16} alt="Check circle" /> {type}
        </div>
      </div>
      <div className="flex h-8 items-center justify-between gap-4 rounded-lg bg-white/10 px-5 py-6 min-[820px]:h-auto min-[820px]:justify-center min-[820px]:rounded-none min-[820px]:bg-transparent min-[820px]:p-0">
        <span className="inline-flex min-[820px]:hidden">Estado</span>
        <div className="flex h-fit select-none items-center justify-center gap-x-2 rounded-2xl bg-warning-200/15 px-2 py-[6px] font-bold text-warning-200 min-[1080px]:px-3">
          <span className="size-[6px] rounded-full bg-warning-200"></span> {state}
        </div>
      </div>
      <div className="flex h-16 items-center justify-center gap-4 rounded-lg bg-white/10 px-5 py-10 min-[820px]:hidden min-[820px]:h-auto min-[820px]:rounded-none min-[820px]:px-0">
        <Image
          src={profile}
          width={50}
          height={50}
          alt="Profile image"
          className="max-w-full rounded-full object-cover object-center"
        />{' '}
        {name}
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="cursor-pointer font-bold text-primary-B-300 hover:underline">{details}</div>
      </div>
    </div>
  );
};

export default ContentItem;
