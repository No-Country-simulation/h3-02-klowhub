interface HeaderContentProps {
  name: string;
  amount: string;
  platform: string;
}

export default function HeaderContentCreate({ name, amount, platform }: HeaderContentProps) {
  return (
    <div className="mb-4 mt-5 hidden max-w-full gap-6 rounded-lg bg-white/10 px-6 py-5 text-sm font-semibold text-white shadow-md min-[820px]:grid min-[820px]:grid-cols-6">
      <div className="col-span-2 flex items-center justify-center gap-4">
        <p>{name}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p>{amount}</p>
      </div>

      <div className="flex items-center justify-center gap-4">
        <p>{platform}</p>
      </div>
    </div>
  );
}
