
import { useEffect, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import { AddHashtagIc, CloseIc, HashtagWarning } from '../../../assets';
import { useFormContextWithRef } from '../../../hooks/common/useFormContextWithRef';
import { useHashtagWithReactHookForm } from '../../../hooks/common/useHashtagWithReactHookForm';
import useModals from '../../../hooks/common/useModals';
import { InputTitle } from '../../common/Form/inputForm';

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
  const { modalRef, unShowModal, handleShowUpdateModal } = useModals({
    isOpen: isRulesOpen,
    setIsOpen: setIsRulesOpen,
  });

  return (
    <div>
      <Styled.HashtagHeader>
        <Styled.Header>
          <InputTitle>Hashtag</InputTitle>
          <HashtagWarning onClick={handleShowUpdateModal} />
        </Styled.Header>
        {isRulesOpen && (
          <Styled.ModalWrapper>
            <Styled.HashtagModal ref={modalRef}>
              <Styled.CloseIcon onClick={unShowModal} />
              <div>
                1. 해시태그는 최대 3개까지 추가 가능합니다.
                <br />
                2. 최대 10자까지 작성이 가능합니다.
                <br />
                3. 작업의 분위기에 대해 설명해주세요. (ex. Dynamic)
              </div>
            </Styled.HashtagModal>
          </Styled.ModalWrapper>
        )}
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
  ModalWrapper: styled.div`
    width: 100%;
    position: relative;
  `,
  CloseIcon: styled(CloseIc)`
    width: 1.2rem;
    height: 1.2rem;
    position: absolute;
    margin: -0.5rem -0.5rem 0 0;
  `,
  HashtagHeader: styled.header`
    display: flex;
    flex-direction: column;

    width: 100%;
    margin-bottom: 2.5rem;
  `,
  Header: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  HashtagModal: styled.aside`
    width: 100%;
    position: absolute;
    line-height: 180%;
    padding: 2.7rem;
    margin-top: 1rem;

    display: flex;

    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    border-radius: 1rem;
    border: 1px solid rgb(49, 51, 56);
    background: rgba(27, 28, 32, 0.5);
    backdrop-filter: blur(15px);

    color: ${({ theme }) => theme.colors.gray2};
    ${({ theme }) => theme.fonts.Pre_14_R};
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
