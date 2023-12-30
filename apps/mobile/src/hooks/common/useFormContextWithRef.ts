import { useRef } from 'react';
import { useForm, useFormContext } from 'react-hook-form';

export function useFormContextWithRef(
  resterOptions: Parameters<ReturnType<typeof useForm>['register']> extends [unknown, ...infer U] ? U : never = []
) {
  const hashtagRef = useRef<HTMLInputElement>();
  const methods = useFormContext();
  const { register } = methods;

  function createRegister(name: string, idx: number) {
    return register(`${name}.${idx}`, ...resterOptions);
  }

  function registerWithRef(name: string, idx: number) {
    const register = createRegister(name, idx);

    const ref = (instance: HTMLInputElement | null) => {
      if (!instance) return;

      hashtagRef.current = instance;

      register.ref(instance);
    };

    return { ...register, ref };
  }

  return { ...methods, hashtagRef, registerWithRef };
}
