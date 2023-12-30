import { useEffect } from 'react';
import { FieldValues, UseFieldArrayAppend, UseFieldArrayRemove, UseFormGetValues } from 'react-hook-form';

export type FormContextType = {
  hashtagRef: React.MutableRefObject<HTMLInputElement | undefined>;
  getValues: UseFormGetValues<FieldValues>;
};

export type FieldArrayType = {
  append: UseFieldArrayAppend<FieldValues, 'hashtag'>;
  remove: UseFieldArrayRemove;
  fields: Record<'id', string>[];
};

export function useHashtagWithReactHookForm(formContext: FormContextType, fieldArray: FieldArrayType) {
  const { hashtagRef, getValues } = formContext;
  const { append, remove, fields } = fieldArray;
  const idx = Number(hashtagRef.current?.name.split('.')[1]);
  const deleteButton = hashtagRef.current?.parentElement?.nextElementSibling as SVGAElement;

  function checkIsDuplicated(targetHashtag: string, arr: string[]) {
    return arr.includes(targetHashtag);
  }

  function handleHashtagInput() {
    if (hashtagRef.current === undefined) return;

    if (
      idx > 0 &&
      checkIsDuplicated(getValues(`hashtag.${idx}`), getValues('hashtag').slice(0, getValues('hashtag').length - 1))
    ) {
      alert('중복된 해시태그 입니다!');
      hashtagRef.current.autofocus = true;
      return;
    }

    hashtagRef.current.readOnly = true;
    deleteButton.style.display = 'block';

    if (fields.length > 2) return;

    append('');
  }

  function handleKeyDownEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (hashtagRef.current === undefined) return;

    if (e.code === 'Enter') {
      handleHashtagInput();
    }
  }

  function handleDeleteHashtag(e: React.MouseEvent<SVGSVGElement>, idx: number) {
    if (hashtagRef.current === undefined) return;

    const deleteTarget = e.target as SVGAElement;

    deleteTarget.style.display = 'none';

    remove(idx);
    append('');
  }

  function activeInput() {
    if (hashtagRef.current === undefined) return;

    if (hashtagRef.current.value === '') {
      hashtagRef.current.readOnly = false;
    }
  }

  function clickOutside(e: Event) {
    if (hashtagRef.current === undefined) return;

    const target = e.target as HTMLElement;

    if (Number(target.dataset.idx) === idx) return;

    handleHashtagInput();
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  });

  useEffect(() => {
    if (!deleteButton) return;
    deleteButton.style.display = 'none';
  }, [idx]);

  return {
    handleKeyDownEnter,
    handleDeleteHashtag,
    activeInput,
  };
}
