import { useState, useRef, useLayoutEffect } from "react";

export default function useAutoHeightTextArea(maxHeight: number) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isMaxHeightReached, setIsMaxHeightReached] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number>(0);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // textarea 높이 조절
    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight / 10}rem`;
      setTextareaHeight(parseInt(textarea.style.height));
    };
    textarea.addEventListener("input", adjustHeight);

    // 지정한 최대 높이에 따라 입력 막기
    const handleKeyPress = (event: KeyboardEvent) => {
      if (textarea.scrollHeight >= maxHeight) {
        setIsMaxHeightReached(true);
        event.preventDefault();
      }
    };
    textarea.addEventListener("keypress", handleKeyPress);

    return () => {
      textarea.removeEventListener("input", adjustHeight);
      textarea.removeEventListener("keypress", handleKeyPress);
    };
  }, [maxHeight]);

  return { textareaRef, isMaxHeightReached, textareaHeight };
}
