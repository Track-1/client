import React, { useRef, useState } from 'react'
import { SignUpUploadImageIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { UploadInfoDataType } from '../../type/uploadInfoDataType';
import { uploadImage } from '../../utils/uploadPage/uploadImage';

export default function SignupNicknameConvention(props:SetStepPropsType) {
    const {setStep}=props;
    const [imageSrc, setImageSrc] = useState<string>("");

    const uploadImage = (e: React.ChangeEvent) => {
      const targetFiles = (e.target as HTMLInputElement).files as FileList;
      const targetFilesArray = Array.from(targetFiles);
      const selectedFiles: string[] = targetFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      setImageSrc(selectedFiles[0]);
    }

  return (
    <>
      <input type="file" onChange={(e) => {uploadImage(e)}} />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
    </>
  );

}
