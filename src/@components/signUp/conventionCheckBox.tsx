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

    function checkFirstIndex(id:number){
        return id===0
    }
    
  return (
    <ConventionCheckBoxContainer>
    {checkedConventions.map(({id, selected, text}:ConventionChecksType)=>(
        <ConventionCheckBoxWrapper checkFirstIndex={checkFirstIndex(id)}>
            <article onClick={()=>categoryClick(id)}>
                {selected?<ConventionFullBoxIc/>:<ConventionBlanckBoxIc/>}
            </article>
            <TextWrapper>
                <Title checkFirstIndex={checkFirstIndex(id)}>{text}</Title>
                <FullConvention checkFirstIndex={checkFirstIndex(id)}>전체보기</FullConvention>
            </TextWrapper>
        </ConventionCheckBoxWrapper>
    ))}
    </ConventionCheckBoxContainer>
  )
}

const ConventionCheckBoxContainer=styled.section`
    margin-top: 2.6rem;
`

const ConventionCheckBoxWrapper=styled.section<{checkFirstIndex:boolean}>`
    display: flex;
    align-items: center;

    width: 56rem;
    height: ${({checkFirstIndex})=>checkFirstIndex?4.4:3.5}rem;

    padding-bottom: ${({checkFirstIndex})=>checkFirstIndex&&0.4}rem;
    margin-bottom: ${({checkFirstIndex})=>checkFirstIndex&&0.9}rem;

    border-bottom: 0.1rem solid ${({theme, checkFirstIndex})=>checkFirstIndex?theme.colors.gray4:"transparent"};

    margin-left: 10rem;
`

const TextWrapper=styled.div`
    display: flex;
    justify-content: space-between;

    width: 100%;
`

const Title=styled.h1<{checkFirstIndex:boolean}>`
    color:${({theme, checkFirstIndex})=>checkFirstIndex?theme.colors.gray1:theme.colors.gray2};
    ${({theme})=>theme.fonts.checkbox};
`

const FullConvention=styled.p<{checkFirstIndex:boolean}>`
    border-bottom: 0.1rem solid ${({theme, checkFirstIndex})=>checkFirstIndex?"transparent":theme.colors.gray3};

    color:${({theme, checkFirstIndex})=>checkFirstIndex?"transparent":theme.colors.gray3};
    ${({theme})=>theme.fonts.checkbox};
`