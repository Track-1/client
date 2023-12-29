import styled from "styled-components";
import ProgressBar from "../../common/ProgressBar";

export default function SingupStep() {
  return (
    <>
      <Styled.Header>
        <ProgressBar progress={50} />
      </Styled.Header>
    </>
  );
}

const Styled = {
  Header: styled.header`
    margin: 4rem 2.5rem 3rem;
  `,
};
