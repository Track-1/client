import styled from "styled-components";
import loading from "../../assets/image/loading.gif";

export default function Loading() {
  return (
    <Background>
      <img src={loading} />
    </Background>
  );
}

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
`;
