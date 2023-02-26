import React, { useState } from 'react'
import { ConventionBlanckBoxIc, ConventionFullBoxIc } from '../../assets'
import { conventionSelectedCheck } from '../../core/signUp/conventionSelectedCheck';
import { ConventionChecksType } from '../../type/conventionChecksType';

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
    {checkedConventions.map((checkedConvention)=>(
        <>
        <div onClick={()=>categoryClick(checkedConvention.id)}>
            {checkedConvention.selected?<ConventionFullBoxIc/>:<ConventionBlanckBoxIc/>}
        </div>
        <p>{checkedConvention.text}</p>
        <p>전체보기</p>
        </>
    ))}
    </>
  )
}
