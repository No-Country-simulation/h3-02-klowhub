'use client';
import Switch from '../Switch/Index';

interface SwitchOptionsProps {
  checkedText: string;
  uncheckedText: string;
  name: string;
  toggle: (checked: boolean) => void;
  isChecked: boolean;
}

//Switch Options muestra el texto en la izquierda(unchecked) y derecha(checked)
export default function SwitchOptions({
  checkedText,
  uncheckedText,
  name,
  toggle,
  isChecked,
}: SwitchOptionsProps) {
  return (
    <div className="flex items-center gap-3 bg-slate-800 p-4">
      <span className={`text-sm ${!isChecked ? 'text-white' : 'text-slate-400'}`}>
        {uncheckedText}
      </span>
      <Switch name={name} isChecked={isChecked} onChange={toggle} />
      <span className={`text-sm ${isChecked ? 'text-purple-400' : 'text-slate-400'}`}>
        {checkedText}
      </span>
    </div>
  );
}
