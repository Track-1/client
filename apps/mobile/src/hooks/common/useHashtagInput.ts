import { useEffect, useState } from "react";
import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";

export default function useHashtagInput() {
  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInputText, handleChangeHashtagInputText, changeHashtagInputText] = useInputText("", TEXT_LIMIT.HASHTAG);

  useEffect(() => {
    hashtagInputText === "" ? setHashtagLength(0) : setHashtagLength(hashtagInputText.length);
  }, [hashtagInputText]);

  function changeHashtags(tags: Array<string>) {
    setHashtags([...tags]);
  }

  function isDuplicateHashtag() {
    const isDuplicate = hashtags.includes(hashtagInputText);
    isDuplicate && alert("중복된 해시태그 입니다!");
    return isDuplicate;
  }

  function handleAddHashtag() {
    if (isDuplicateHashtag()) return;

    if (hashtagInputText && hashtags.length < 3) {
      setHashtags((prev) => [...prev, hashtagInputText]);
      changeHashtagInputText("");
      setHashtagLength(0);
    }
  }

  function handleRemoveHashtag(tag: string) {
    setHashtags(hashtags.filter((item) => item !== tag));
  }

  return {
    hashtags,
    hashtagLength,
    hashtagInputText,
    changeHashtags,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  };
}
