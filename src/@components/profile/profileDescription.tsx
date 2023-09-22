import styled from "styled-components";
import { DescriptionIc } from "../../assets";
import Empty from "./empty";

interface ProfileDescriptionProps {
  introduce: string | undefined;
}

export default function ProfileDescription(props: ProfileDescriptionProps) {
  const { introduce } = props;

  return (
    <DescriptionBox>
      <DescriptionIcon />
      {introduce && introduce?.length > 0 ? <Introduce>{introduce}</Introduce> : <Empty />}
    </DescriptionBox>
  );
}

const DescriptionBox = styled.div`
  width: 43rem;

  display: flex;
  justify-content: flex-start;

  ${({ theme }) => theme.fonts.description}
  color: ${({ theme }) => theme.colors.gray2};

  margin-top: 4.7rem;
`;

const Introduce = styled.div`
  width: 28.5rem;
  outline: 0;
  resize: none;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  border: none;
  background-color: transparent;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  overflow: hidden;
`;

const DescriptionIcon = styled(DescriptionIc)`
  width: 12rem;
  margin-top: 0.7rem;
  margin-right: 2.9rem;
`;
