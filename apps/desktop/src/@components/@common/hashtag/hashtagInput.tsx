import styled from 'styled-components';
import { AddHashtagIc, DeleteHashtagIc } from '../../../assets';
import { useEffect } from 'react';
import { useFromContextWithRef } from '../../../hooks/common/useFromContextWithRef';
import { useFieldArray } from 'react-hook-form';
import { useHashtagWithReactHookForm } from '../../../hooks/common/useHashtagWithReactHookForm';

export default function HashtagInput() {
  const formContext = useFromContextWithRef();
  const { registerWithRef, watch, getValues } = formContext;
  const fieldArray = useFieldArray({
    name: 'hashtag',
  });
  const { append, fields } = fieldArray;
  const { handleKeyDownEnter, handleDeleteHashtag, activeInput } = useHashtagWithReactHookForm(formContext, fieldArray);

  useEffect(() => {
    if (getValues('hashtag').length >= 3) return;

    append('');
  }, []);

  return (
    <HashtagWrapper>
      {fields.map((field, idx) => {
        return (
          <HashtagBox data-idx={idx}>
            <HashtagInputWrapper data-idx={idx}>
              <HashtagSharp data-idx={idx}># </HashtagSharp>
              <HashtagInputText
                key={field.id}
                placeholder="hashtag"
                onKeyPress={(e) => handleKeyDownEnter(e)}
                onClick={activeInput}
                inputWidth={watch('hashtag')[idx].length}
                autoComplete="off"
                maxLength={10}
                data-idx={idx}
                autoFocus
                {...registerWithRef('hashtag', idx)}
              />
            </HashtagInputWrapper>
            <DeleteHashtagIcon onClick={(e) => handleDeleteHashtag(e, idx)} />
          </HashtagBox>
        );
      })}
      {fields.length < 3 && <AddHashtagIcon />}
    </HashtagWrapper>
  );
}

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  height: 100%;

  margin-bottom: 4.8rem;
`;

const HashtagBox = styled.div`
  display: flex;
  align-items: center;

  height: 3.8rem;

  padding-right: 1rem;
  margin-right: 1rem;

  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const HashtagInputWrapper = styled.div`
  display: flex;

  padding: 0 0.5rem 0 1.5rem;
`;

const HashtagSharp = styled.p`
  margin-right: 0.5rem;

  color: ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.hashtag};
`;

const DeleteHashtagIcon = styled(DeleteHashtagIc)`
  width: 2.8rem;

  margin-left: -1rem;

  cursor: pointer;
`;

const HashtagInputText = styled.input<{ inputWidth: number }>`
  display: flex;

  width: ${({ inputWidth }) => (inputWidth === 0 ? 9 : inputWidth * 1.5 + 1)}rem;
  ${({ theme }) => theme.fonts.hashtag};

  color: ${({ theme }) => theme.colors.gray1};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 3.8rem;
  height: 3.8rem;

  cursor: pointer;
`;
