import TabsList from './TabList';
import TabsTrigger from './TabTrigger';

interface TabListTriggerProps {
  triggers: { label: string; value: string }[];
}

export default function TabListTrigger({ triggers }: TabListTriggerProps) {
  return (
    <TabsList>
      {triggers.map((item, i) => (
        <TabsTrigger key={`tlt-${i}`} value={item.value}>
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}