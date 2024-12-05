import TabsList from './TabList';
import TabsTrigger from './TabTrigger';

interface TabListTriggerProps {
  triggers: { label: string; value: string }[];
  className?: string;
}

export default function TabListTrigger({ triggers, className = '' }: TabListTriggerProps) {
  return (
    <TabsList className={className}>
      {triggers.map((item, i) => (
        <TabsTrigger key={`tlt-${i}`} value={item.value}>
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
