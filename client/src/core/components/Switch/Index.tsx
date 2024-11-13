import * as SwitchPrimitive from '@radix-ui/react-switch';

interface SwitchProps {
  name: string;
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

//Switch implementacion: https://www.radix-ui.com/primitives/docs/components/switch
export default function Switch({ isChecked, onChange, name }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      name={name}
      checked={isChecked}
      onCheckedChange={onChange}
      className="relative h-6 w-11 cursor-pointer rounded-full bg-slate-600 outline-none data-[state=checked]:bg-[#702486]">
      <SwitchPrimitive.Thumb className="block size-5 translate-x-0.5 rounded-full bg-white shadow-[0px_1px_1px_0px_rgba(0,0,0,0.06),0px_1px_2px_0px_rgba(0,0,0,0.10)] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[22px]" />
    </SwitchPrimitive.Root>
  );
}
