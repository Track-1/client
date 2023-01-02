import styled from "styled-components"

export default function VocalProfileList() {
  return (
    <VocalProfileListWrapper>
    <VocalsBoxWrapper>
      <VocalsBoxBody></VocalsBoxBody>
      <VocalsBoxHead></VocalsBoxHead>
    </VocalsBoxWrapper>

    <Vocals>
      
    </Vocals>
    </VocalProfileListWrapper>
  )
}

const VocalProfileListWrapper=styled.section`
  position: absolute;
  z-index: 5;
`

const VocalsBoxWrapper=styled.section`
`

const VocalsBoxHead=styled.div`
  width: 35.5rem;
  height: 35.45rem;
  margin: 33rem 0 0 35.4rem;    

  transform: rotate(45deg);

  border: 0.34rem solid ${({ theme }) => theme.colors.sub2};
  border-radius: 5.5rem 3rem 5.4rem 3rem;
`

const VocalsBoxBody=styled.div`
  position: absolute;
  z-index: 3;

  width: 47.7rem;
  height: 100rem;

  margin-left: 29.3rem;
  margin-top: 18rem;

  border-left: 0.3rem solid;
  border-right: 0.3rem solid;
  border-color: ${({ theme }) => theme.colors.sub2};

  background-color: ${({ theme }) => theme.colors.sub3};
`

const Vocals=styled.section`
  
`

