import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { AddHashtagIc, CloseIc, HashtagWarning } from '../../../assets';
import { useFormContextWithRef } from '../../../hooks/common/useFormContextWithRef';
import { InputTitle } from '../../common/Form/inputForm';
import SimpleModal from '../../common/Modal/SimpleModal';
import Hashtag from '../../common/Hashtag';

export default function ProfileHashtagEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

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
        {<Hashtag hashtags={methods.watch('hashtag')} hashtagSet={methods.setValue} hashtagGet={methods.getValues} />}
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
