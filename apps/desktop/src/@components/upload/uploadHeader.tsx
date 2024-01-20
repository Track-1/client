import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { UploadAbleBtnIc, UploadUnableBtnIc } from '../../assets';
import { SelectCategoryContext } from '../../context/selectCategoryContext';

export default function UploadHeader() {
  const {
    getValues,
    formState: { isValid },
  } = useFormContext();
  const { selectedOption } = useContext(SelectCategoryContext);

  return (
    <Wrapper>
      <UploadTypeText>{}</UploadTypeText>
      {getValues('hashtag')[0] !== '' && isValid && selectedOption !== null ? (
        <button type="submit">
          <UploadAbleBtnIcon />
        </button>
      ) : (
        <UploadUnableBtnIcon />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const UploadTypeText = styled.div`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.id};

  margin-left: 6.1rem;
`;

const UploadUnableBtnIcon = styled(UploadUnableBtnIc)`
  cursor: pointer;
  width: 24.6rem;
`;

const UploadAbleBtnIcon = styled(UploadAbleBtnIc)`
  cursor: pointer;
  width: 24.6rem;
`;
