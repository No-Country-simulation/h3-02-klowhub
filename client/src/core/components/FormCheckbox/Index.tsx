import Checkbox from '../Checkbox/Index';

interface FormCheckboxProps {
  onChange?: (value: string, isCheked: boolean) => void;
  label: string;
  id: string;
  defaultValue?: string | number;
  name: string;
}

// Checkbox con un label
const FormCheckbox = ({ defaultValue = 'false', id, label, name }: FormCheckboxProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex size-4 items-center justify-center">
        <Checkbox id={id} defaultValue={defaultValue} name={name} />
      </div>
      <label htmlFor={id} className="cursor-pointer select-none font-medium">
        {label}
      </label>
    </div>
  );
};

// Export default en componentes
export default FormCheckbox;
