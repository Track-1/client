
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { AddHashtagIc, CloseIc, HashtagWarning } from '../../../assets';
import { useFormContextWithRef } from '../../../hooks/common/useFormContextWithRef';
import { InputTitle } from '../../common/Form/inputForm';
import SimpleModal from '../../common/Modal/SimpleModal';
import Hashtag from '../../common/Hashtag';
import useModals from '../../../hooks/common/useModals';

export default function ProfileHashtagEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const { modalRef, unShowModal, handleShowUpdateModal } = useModals({
    isOpen: isRulesOpen,
    setIsOpen: setIsRulesOpen,
  });

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
        {<Hashtag hashtags={methods.watch('hashtag')} hashtagSet={methods.setValue} hashtagGet={methods.getValues} />}
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

const HashtagBox = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;

  height: 3rem;

  padding: 1rem;

  border-radius: 1.5rem;

  background-color: ${({ theme }) => theme.colors.gray5};
`;

const DeleteHashtagIcon = styled(CloseIc)`
  margin-left: -1rem;

  cursor: pointer;
`;

const HashtagInput = styled.input`
  display: flex;

  ${({ theme }) => theme.fonts.Pre_14_R};
  width: auto;
  color: ${({ theme }) => theme.colors.white};

  ::placeholder {
    width: 8rem;
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

const AddHashtagIcon = styled(AddHashtagIc)`
  width: 3.8rem;
  height: 3.8rem;
  padding-top: 0.5rem;
  cursor: pointer;
`;
