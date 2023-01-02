import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Player from "../@components/@common/player";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import {showPlayerBar} from "../recoil/player"
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";


export default function VocalProfilePage() {
  const showPlayer=useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom]=useRecoilState(tracksOrVocalsCheck);

  setWhom("Vocals") 

  return (
    <>
    {showPlayer&&(<Player />)}

    <VocalProfileWrapper>
      <VocalProfileShadow/>
    </VocalProfileWrapper>
    </>
  );
}

const VocalProfileWrapper=styled.section`
  width: 132rem;
`