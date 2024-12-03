import Image from 'next/image';

interface HeaderContentProps {
  name: string;
  amount: string;
  type: string;
  state: string;
  platform: string;
}

export default function HeaderContent({ name, amount, type, state, platform }: HeaderContentProps) {
  return (
    <div className="mb-4 mt-5 hidden max-w-full gap-6 rounded-lg bg-white/10 px-6 py-5 text-sm font-semibold text-white shadow-md min-[820px]:grid min-[820px]:grid-cols-6">
      <div className="col-span-2 flex items-center justify-center gap-4">
        <Image src={'/svg/people.svg'} width={24} height={24} alt={`${name} icon`} /> <p>{name}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image src={'/svg/dollar.svg'} width={24} height={24} alt={`${amount} icon`} />{' '}
        <p>{amount}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image src={'/svg/tag.svg'} width={24} height={24} alt={`${type} icon`} /> <p>{type}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image src={'/svg/activity.svg'} width={24} height={24} alt={`${state} icon`} />{' '}
        <p>{state}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Image src={'/svg/details.svg'} width={24} height={24} alt={`${platform} icon`} />{' '}
        <p>{platform}</p>
      </div>
    </div>
  );
}
