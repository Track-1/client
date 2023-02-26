import React, { useRef, useState } from 'react'
import { SignUpUploadImageIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { UploadInfoDataType } from '../../type/uploadInfoDataType';
import { uploadImage } from '../../utils/uploadPage/uploadImage';

export default function SignupNicknameConvention(props:SetStepPropsType) {
    const {setStep}=props;
    // const [imageSrc, setImageSrc] = useState<string | ArrayBuffer>("");
    // const photoRef = useRef(null);
    
    // const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const reader = new FileReader();
    //   e.target.files&&reader.readAsDataURL(e.target.files[0]);
    //   return new Promise((resolve) => {
    //     reader.onload = () => {
    //       reader.result&&setImageSrc(reader.result);
    //       // resolve();
    //       // document.querySelector("#background").style.display = "none";
    //     };
    //   });
    // };

    const [imageSrc, setImageSrc] = useState<string>("");

    // const encodeFileToBase64 = (e: React.ChangeEvent) => {
    //   const targetFiles = (e.target as HTMLInputElement).files as FileList;
    //   const reader = new FileReader();
    //   reader.readAsDataURL(targetFiles[0]);
    //   return new Promise((resolve) => {
    //     reader.onload = () => {
    //       setImageSrc(reader.result);
    //       resolve();
    //     };
    //   });
    // };

    const handleChange = (e: React.ChangeEvent) => {
      const targetFiles = (e.target as HTMLInputElement).files as FileList;
      const targetFilesArray = Array.from(targetFiles);
      const selectedFiles: string[] = targetFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      // 합체!
      // setImageSrc((prev) => prev.concat(selectedFiles));
      setImageSrc(selectedFiles[0]);
    }

  return (
    <main className="container">
      <h2>이미지 미리보기</h2>
      <input type="file" onChange={(e) => {handleChange(e)}} />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>
    </main>
  );

}
