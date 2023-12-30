import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { AddHashtagIc, CloseIc, HashtagWarning } from '../../../assets';
import { useFormContextWithRef } from '../../../hooks/common/useFormContextWithRef';
import { useHashtagWithReactHookForm } from '../../../hooks/common/useHashtagWithReactHookForm';
import { InputTitle } from '../../common/Form/inputForm';
import SimpleModal from '../../common/Modal/SimpleModal';

export default function ProfileHashtagEdit() {
  const formContext = useFormContextWithRef();
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

  const [isRulesOpen, setIsRulesOpen] = useState(false);

  function onClose() {
    setIsRulesOpen(false);
  }

  function onOpen() {
    setIsRulesOpen(true);
  }

  return (
    <div>
      <SimpleModal isOpen={isRulesOpen} onClose={onClose}>
        <>
          1. 해시태그는 최대 3개까지 추가 가능합니다.
          <br />
          2. 최대 10자까지 작성이 가능합니다.
          <br />
          3. 작업의 분위기에 대해 설명해주세요. (ex. Dynamic)
        </>
      </SimpleModal>
      <Styled.HashtagHeader>
        <InputTitle>Hashtag</InputTitle>
        <HashtagWarning onClick={onOpen} />
      </Styled.HashtagHeader>
      <HashtagWrapper>
        {fields.map((field, idx) => {
          return (
            <HashtagBox data-idx={idx} inputWidth={watch('hashtag')[idx].length} key={idx}>
              <HashtagInputWrapper data-idx={idx}>
                <HashtagSharp data-idx={idx} inputWidth={watch('hashtag')[idx].length}>
                  #
                </HashtagSharp>
                <HashtagInputText
                  key={field.id}
                  placeholder="Hashtag"
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
    </div>
  );
}

const Styled = {
  HashtagHeader: styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 2.5rem;
  `,
};

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  height: 100%;
`;

const HashtagBox = styled.div<{ inputWidth: number }>`
  display: flex;
  align-items: center;
  white-space: nowrap;

  height: 3.8rem;

  padding: 1rem;

  margin-right: 1rem;
  margin-top: 0.5rem;

  border-radius: 2.1rem;
  background-color: ${({ theme, inputWidth }) => (inputWidth > 0 ? theme.colors.neon_purple : theme.colors.gray5)};
`;

const HashtagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HashtagSharp = styled.p<{ inputWidth: number }>`
  color: ${({ theme, inputWidth }) => (inputWidth > 0 ? theme.colors.white : theme.colors.gray3)};

  ${({ theme }) => theme.fonts.Pre_14_R};
`;

const DeleteHashtagIcon = styled(CloseIc)`
  width: 1rem;
  height: 1rem;

  margin-left: -1rem;

  cursor: pointer;
`;

const HashtagInputText = styled.input<{ inputWidth: number }>`
  display: flex;

  ${({ theme }) => theme.fonts.Pre_14_R};
  width: ${({ inputWidth }) => (inputWidth === 0 ? 8 : inputWidth * 1.5)}rem;
  color: ${({ theme, inputWidth }) => (inputWidth > 0 ? theme.colors.white : theme.colors.gray3)};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 3.8rem;
  height: 3.8rem;
  padding-top: 0.5rem;
  cursor: pointer;
`;
