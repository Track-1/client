import { KeyboardEvent, useEffect, useState } from "react";
import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";

export default function useHashtagInput() {
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInputText, handleChangeHashtagInputText, setHashtagInputText] = useInputText("", TEXT_LIMIT.HASHTAG);

  useEffect(() => {
    hashtagInputText === "" ? setHashtagLength(0) : setHashtagLength(hashtagInputText.length);
  }, [hashtagInputText]);

  function changeHashtags(tags: Array<string>) {
    setHashtags([...tags]);
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
    changeHashtags,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  };
}
