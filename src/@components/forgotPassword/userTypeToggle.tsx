import styled from "styled-components";
import { DefaultToggleIc, ProducerTypeToggleIc } from "../../assets";

interface UserTypeToggleType {
  producerType: boolean;
  handleChangeUserType: () => void;
}

export default function UserTypeToggle(props: UserTypeToggleType) {
  const { producerType, handleChangeUserType } = props;
  return (
    <ToggleWrapper>
      producerType
      {producerType ? (
        <ProducerTypeToggleIcon onClick={handleChangeUserType} />
      ) : (
        <DefaultToggleIcon onClick={handleChangeUserType} />
      )}
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;

  width: 55.9rem;

  margin-top: 1.2rem;
  margin-bottom: 3.1rem;

  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.gray1};
`;

const ProducerTypeToggleIcon = styled(ProducerTypeToggleIc)`
  margin-left: 1.2rem;
  cursor: pointer;
`;

const DefaultToggleIcon = styled(DefaultToggleIc)`
  margin-left: 1.2rem;
  cursor: pointer;
`;
