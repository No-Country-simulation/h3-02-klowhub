import { RadioGroup, RadioGroupItem } from '@core/components/RadioGroup';
import { cn } from '@core/lib/utils';

interface FormRadioGroupProps {
  defaultValue?: string;
  title: string;
  items: { value: string; label: string; id: string; className?: string }[];
}

export default function FormRadioGroup({ defaultValue = '', title, items }: FormRadioGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-white">{title}</h3>
      <RadioGroup defaultValue={defaultValue} name="courseMonetizable">
        {items.map(item => (
          <div key={item.id} className="inline-block space-x-4 text-white">
            <RadioGroupItem value={item.value} id={item.id} />
            <label htmlFor={item.id} className={cn('view-disabled-input', item.className || '')}>
              {item.label}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
