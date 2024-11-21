interface ExtraContentInfoProps {
  title: string;
  content: string;
}

const ExtraContentInfo = ({ title, content }: ExtraContentInfoProps) => {
  return (
    <div className="flex h-24 w-full flex-col items-center justify-between rounded-lg bg-white/10 p-4">
      <h3 className="text-center text-sm text-white">{title}</h3>
      <p className="text-center text-xl font-bold text-primary-B-300">{content}</p>
    </div>
  );
};

export default ExtraContentInfo;
