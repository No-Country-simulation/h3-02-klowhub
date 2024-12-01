import type { FieldType } from '@core/types/fields';
import FormField from '../FormField';
import PasswordFormField from '../PasswordField';

interface RenderFieldsProps {
  field: FieldType;
  error: string;
}

const RenderFields = ({ field, error }: RenderFieldsProps) => {
  //Se hace un mapeo de los atributos common de los fields
  const commonProps = {
    autoComplete: field.autoComplete || 'off',
    placeholder: field.placeholder,
    error,
    id: field.id,
    name: field.name,
    defaultValue: field.defaultValue || '',
    tabIndex: field.tabindex,
  };
  //Segun el tipo de "field" renderiza uno u otro componente
  if (field.type === 'password') {
    return (
      <PasswordFormField {...commonProps} type={field.type} activeForgot={field?.activeForgot} />
    );
  }
  //Aqui se podria agregar logica para otro tipo de fields (textarea,select,number,date,etc)
  return <FormField {...commonProps} type={field.type} />;
};
// Export default en componentes
export default RenderFields;
