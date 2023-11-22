import { useState } from "react";

export default function useShowImage(imageFile: File | Blob | undefined | null) {
  const [showImage, setShowImage] = useState<string>();

  if (imageFile) {
    const reader = new FileReader();

    reader.readAsDataURL(imageFile);

    reader.onload = (e) => {
      setShowImage(e.target?.result as string);
    };
  }

  return showImage;
}