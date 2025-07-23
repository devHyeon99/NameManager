import * as S from './FormField.styles';
import { FieldError } from 'react-hook-form';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: FieldError;
}

export function FormField({ id, label, error, ...rest }: FormFieldProps) {
  return (
    <S.FieldWrapper>
      <S.VisuallyHiddenLabel htmlFor={id}>{label}</S.VisuallyHiddenLabel>
      <S.Input id={id} {...rest} />
      {error && <S.ErrorMessage>{error.message}</S.ErrorMessage>}
    </S.FieldWrapper>
  );
}
