import { KeyboardEvent, useEffect, useState } from "react";
import { checkKorean } from "../../utils/common/checkKorean";
import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";

export default function useHashtagInput() {
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInputText, handleChangeHashtagInputText, setHashtagInputText] = useInputText("", TEXT_LIMIT.HASHTAG);

  useEffect(() => {
    checkHashtagText();
  }, [hashtagInputText]);

  function calculateHashtagLength(hashtagValue: string): number {
    return checkKorean(hashtagValue) ? hashtagValue.length * 1.5 + 1 : hashtagValue.length * 1.2 + 1;
  }

  function checkHashtagText() {
    const hashtagLength = hashtagInputText.trim() !== "" ? calculateHashtagLength(hashtagInputText) : 0;
    setHashtagLength(hashtagLength);
  }

  function handleAddHashtag() {
    if (hashtagInputText && hashtags.length < 3) {
      setHashtags((prev) => [...prev, hashtagInputText]);
      setHashtagInputText("");
      setHashtagLength(0);
    }
  }

  function handleEnterHashtag(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") return;
    handleAddHashtag();
  }

  function handleRemoveHashtag(tag: string) {
    setHashtags(hashtags.filter((item) => item !== tag));
  }

  return {
    hashtags,
    hashtagLength,
    hashtagInputText,
    checkHashtagText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  };
}
