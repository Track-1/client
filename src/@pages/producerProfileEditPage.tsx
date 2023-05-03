import styled from "styled-components";

import EditLeftContainer from "../@components/producerProfileEdit/editLeftContainer/editLeftContainer";
import EditRightontainer from "../@components/producerPortfolioEdit/editRightContainer/editRightContainer";

export default function ProducerProfileEditPage() {
  return (
    <>
      프로듀서프로필수정
      <Temporary>
        <TemporaryLeft>
          <EditLeftContainer />
        </TemporaryLeft>
        <TemporaryRight>
          <EditRightontainer />
        </TemporaryRight>
      </Temporary>
    </>
  );
}

const Temporary = styled.div`
  color: white;
  font-size: 2rem;
`;

const TemporaryLeft = styled.div`
  float: left;
`;

const TemporaryRight = styled.div`
  float: right;
`;
