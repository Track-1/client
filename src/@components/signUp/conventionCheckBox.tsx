import React, { useState } from 'react'
import { ConventionBlanckBoxIc, ConventionFullBoxIc } from '../../assets'
import { conventionSelectedCheck } from '../../core/signUp/conventionSelectedCheck';
import { ConventionChecksType } from '../../type/conventionChecksType';
import styled from 'styled-components';

export default function ConventionCheckBox() {
    const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(conventionSelectedCheck);

    function categoryClick(id: number) {
        setCheckedConventions(
            checkedConventions.map((checkedConvention) =>
            checkedConvention.id === id ? { ...checkedConvention, selected: !checkedConvention.selected } : checkedConvention,
          ),
        );
      }
    
  return (
    <>
    {checkedConventions.map(({id, selected, text})=>(
        <ConventionCheckBoxWrapper>
            <article onClick={()=>categoryClick(id)}>
                {selected?<ConventionFullBoxIc/>:<ConventionBlanckBoxIc/>}
            </article>
            <Title>{text}</Title>
            <FullConvention>전체보기</FullConvention>
        </ConventionCheckBoxWrapper>
    ))}
    </>
  )
}

const ConventionCheckBoxWrapper=styled.section`
    display: flex;
    align-items: center;

    width: 56rem;
    height: 4rem;

    margin-left: 10rem;
`

// const Title=styled.h1<{id:number}>`
//     color:${({theme, id})=>id===0?theme.colors.gray1:2};
// `

// const FullConvention=styled.p<{id:number}>`
//     color:${({theme, id})=>id===0?"transparent":theme.colors.gray3}
// `
const Title=styled.h1`
    color:${({theme})=>theme.colors.gray1};
`

const FullConvention=styled.p`
    color:${({theme})=>theme.colors.gray3}
`