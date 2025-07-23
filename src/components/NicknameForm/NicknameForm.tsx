import { useForm, SubmitHandler, Controller } from 'react-hook-form'; // Controller를 import합니다.
import { Nickname } from '@/types';
import * as S from './NicknameForm.styles';
import { FormField } from '@/components/FormField/FormField';

type FormValues = {
  name: string;
  date: string;
  otherName?: string;
  union?: number;
  badge?: number;
};

interface NicknameFormProps {
  onAdd: (data: FormValues) => void;
}

function NicknameForm({ onAdd }: NicknameFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      date: '',
      otherName: '',
      union: undefined,
      badge: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onAdd(data);
    reset();
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormField
        id='name'
        label='사라질 닉네임'
        placeholder='사라질 닉네임'
        autoComplete='off'
        error={errors.name}
        {...register('name', { required: '닉네임은 필수 항목입니다.' })}
      />
      <FormField
        id='otherName'
        label='본캐 닉네임'
        placeholder='본캐 닉네임'
        autoComplete='off'
        error={errors.otherName}
        {...register('otherName')}
      />
      <FormField
        id='union'
        label='유니온'
        type='number'
        placeholder='유니온 (선택)'
        autoComplete='off'
        error={errors.union}
        {...register('union', { valueAsNumber: true })}
      />
      <FormField
        id='badge'
        label='업적'
        type='number'
        placeholder='업적 (선택)'
        autoComplete='off'
        {...register('badge', { valueAsNumber: true })}
        error={errors.badge}
      />

      <Controller
        name='date'
        control={control}
        rules={{
          required: '날짜는 필수 항목입니다.',
          pattern: {
            value: /^\d{4}-\d{2}-\d{2}$/,
            message: 'YYYY-MM-DD 형식으로 입력해주세요.',
          },
        }}
        render={({ field, fieldState }) => (
          <FormField
            id='date'
            label='날짜'
            placeholder='YYYY-MM-DD'
            maxLength={10}
            error={fieldState.error}
            {...field}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/[^0-9]/g, '');
              let formattedValue = rawValue;

              if (rawValue.length > 4) {
                formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(4)}`;
              }
              if (rawValue.length > 6) {
                formattedValue = `${rawValue.slice(0, 4)}-${rawValue.slice(
                  4,
                  6
                )}-${rawValue.slice(6, 8)}`;
              }

              field.onChange(formattedValue);
            }}
          />
        )}
      />

      <S.SubmitButton type='submit' disabled={isSubmitting}>
        {isSubmitting ? '추가 중...' : '추가'}
      </S.SubmitButton>
    </S.FormContainer>
  );
}

export default NicknameForm;
