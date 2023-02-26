import React, { useEffect, useState } from 'react'
import { ConventionBlanckBoxIc, ConventionFullBoxIc } from '../../assets'
import { conventionSelectedCheck } from '../../core/signUp/conventionSelectedCheck';
import { ConventionChecksType } from '../../type/conventionChecksType';
import styled from 'styled-components';

export default function ConventionCheckBox() {
    const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(conventionSelectedCheck);
    const [checkedCount, setCheckedCount]=useState<number>(0);

    function categoryClick(id: number) {
        if (checkFirstIndex(id)){
            setCheckedConventions(
                checkedConventions.map((checkedConvention) =>
                checkedConvention.id === id ? { ...checkedConvention, selected: !checkedConvention.selected } : checkedConvention,
              ),
            );    

            checkedConventions[id].selected?
            setCheckedConventions(
                checkedConventions.map((checkedConvention) =>
                checkedConvention.id === id ? { ...checkedConvention, selected: true }:{ ...checkedConvention, selected: true }
              ),
            ):setCheckedConventions(
                checkedConventions.map((checkedConvention) =>
                checkedConvention.id === id ? { ...checkedConvention, selected: false }:{ ...checkedConvention, selected: false }
            ))    
            
        }
        else{
            setCheckedConventions(
                checkedConventions.map((checkedConvention) =>
                checkedConvention.id === id ? { ...checkedConvention, selected: !checkedConvention.selected } : checkedConvention,
              ),
            );    
        }
      }
    
    useEffect(() => {
        // checkedConventions[0].selected?
        // setCheckedConventions(
        //     checkedConventions.map((checkedConvention) =>
        //     ({ ...checkedConvention, selected: true })
        //   ),
        // ):setCheckedConventions(
        //     checkedConventions.map((checkedConvention) =>
        //     ({ ...checkedConvention, selected: false })
        // ))    

        // checkedConventions.forEach((checkedConvention) => {
        //     (!checkFirstIndex(checkedConvention.id))&&checkedConvention.selected?setCheckedCount(prev=>prev+1):setCheckedCount(prev=>prev-1)
        // });
        
        // if (checkFullChecked()){ //전체 다 참
        //     setCheckedConventions(
        //         checkedConventions.map((checkedConvention) =>
        //         checkedConvention.id === 0 ? { ...checkedConvention, selected: true } : checkedConvention
        //       )
        //     )
        // }
        // else{
        //     setCheckedConventions( //한개라도 빔
        //         checkedConventions.map((checkedConvention) =>
        //         checkedConvention.id === 0 ? { ...checkedConvention, selected: false } : checkedConvention
        //       )
        //     )
        // }

        // if (checkFirstIndex(id)){
        //     checkedConventions[id].selected?
        //     setCheckedConventions(
        //         checkedConventions.map((checkedConvention) =>
        //         ({ ...checkedConvention, selected: true })
        //       ),
        //     ):setCheckedConventions(
        //         checkedConventions.map((checkedConvention) =>
        //         ({ ...checkedConvention, selected: false })
        //     ))    
        

        
    }, [checkedConventions])


    function checkFirstIndex(id:number){
        return id===0
    }

    function checkFullChecked(){
        return checkedCount===3
    }
    
  return (
    <ConventionCheckBoxContainer>
    {checkedConventions.map(({id, selected, text}:ConventionChecksType)=>(
        <ConventionCheckBoxWrapper checkFirstIndex={checkFirstIndex(id)}>
            <CheckBox onClick={()=>categoryClick(id)}>
                {selected?<ConventionFullBoxIc/>:<ConventionBlanckBoxIc/>}
            </CheckBox>
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

const CheckBox=styled.article`
    cursor: pointer;    
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
    visibility: ${({checkFirstIndex})=>checkFirstIndex?"hidden":"visible"};

    border-bottom: 0.1rem solid ${({theme})=>theme.colors.gray3};

    color:${({theme})=>theme.colors.gray3};
    ${({theme})=>theme.fonts.checkbox};

    cursor: pointer;
`