import React from 'react'
import { ToggleIcon, Track1Icon } from '../../assets/icon'
import profileImgSrc from '../../assets/image/profileImg.png'

export default function categoryHeader() {
  return (
    <header>
        <Track1Icon/>
        <p>Tracks</p>
        <p>Vocals</p>
        <img src={profileImgSrc} alt="프로필이미지"/>
        <ToggleIcon/>
    </header>
  )
}
