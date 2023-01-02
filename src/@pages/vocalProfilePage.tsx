import styled from "styled-components";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";

export default function VocalProfilePage() {
  return (
    <>
    <VocalProfileWrapper>
      <VocalProfileShadow/>
    </VocalProfileWrapper>
    </>
  );
}

const VocalProfileWrapper=styled.section`
  width: 132rem;
`