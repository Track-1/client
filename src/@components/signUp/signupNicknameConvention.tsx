import React, { useRef, useState } from 'react'
import { SignUpUploadImageIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { UploadInfoDataType } from '../../type/uploadInfoDataType';
import { uploadImage } from '../../utils/uploadPage/uploadImage';

export default function SignupNicknameConvention(props:SetStepPropsType) {
    const {setStep}=props;
    const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>("");
    const photoRef = useRef(null);
    
    const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      e.target.files&&reader.readAsDataURL(e.target.files[0]);
      return new Promise((resolve) => {
        reader.onload = () => {
          reader.result&&setImageSrc(reader.result);
          // resolve();
          // document.querySelector("#background").style.display = "none";
        };
      });
    };

  return (
    <>
    <label htmlFor="imageFileUpload">
      <SignUpUploadImageIc/>
      <div  id='background'></div>
          {imageSrc!=="" && <img src={imageSrc} id="showimg" alt="#" />}
      </label>
      <input
        type="file"
        id="imageFileUpload"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        onChange={(e) => previewImg(e)}
        readOnly
      />
    </>
  )
}
