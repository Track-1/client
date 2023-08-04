import styled from "styled-components";
import ProducerLayout from "./producer/ProducerLayout";
import VocalLayout from "./vocal/VocalLayout";
import { USER_DATA } from "../../core/common/userData";
import UploadTitle from "./UploadTitle";
import UploadInfo from "./UploadInfo";

export default function UploadBody() {
  const loginUserType = "producer"; // 임시 데이터 (이후에는 recoil값으로 변경할 예정)

  return (
    <Container>
      {loginUserType !== USER_DATA.PRODUCER ? (
        <ProducerLayout>
          <UploadDataWrapper>
            <UploadTitle />
            <UploadInfo />
          </UploadDataWrapper>
        </ProducerLayout>
      ) : (
        <VocalLayout>
          <UploadDataWrapper>
            <UploadTitle />
            <UploadInfo />
          </UploadDataWrapper>
        </VocalLayout>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadDataWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
