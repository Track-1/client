import { KeyboardEvent, useEffect, useRef, useState } from "react";
import useInputText from "./useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";

export default function useHashtagInput() {
  const hashtagRef = useRef<HTMLInputElement | null>(null);
  const hashtagDeleteRef = useRef<SVGSVGElement | null>(null);

  const [hashtagLength, setHashtagLength] = useState<number>(0);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInputText, handleChangeHashtagInputText, changeHashtagInputText] = useInputText("", TEXT_LIMIT.HASHTAG);

  function changeHashtags(tags: Array<string>) {
    setHashtags([...tags]);
  }

  function isDuplicateHashtag() {
    return hashtags.includes(hashtagInputText);
  }

  function handleAddHashtag() {
    if (isDuplicateHashtag()) {
      alert("중복된 해시태그 입니다!");
      return;
    }

    setHashtags((prev) => [...prev, hashtagInputText]);
    changeHashtagInputText("");
    setHashtagLength(0);
  }

  function handleRemoveHashtag(tag: string) {
    setHashtags(hashtags.filter((item) => item !== tag));
  }

  function clickOutSide() {
    if (hashtagRef === null || hashtagDeleteRef === null) return;
    if (hashtagRef.current === null || hashtagDeleteRef === null) return;
    if (hashtagRef.current === undefined || !hashtagRef.current.value) return;
    if (hashtagRef.current?.value) {
      handleAddHashtag();
    }
  }

  function handleEnterHashtag(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false && !isDuplicateHashtag()) {
      handleAddHashtag();
    }
  }

  useEffect(() => {
    hashtagInputText === "" ? setHashtagLength(0) : setHashtagLength(hashtagInputText.length);
  }, [hashtagInputText]);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutSide);
    return () => {
      document.removeEventListener("mousedown", clickOutSide);
    };
  });

  return {
    hashtags,
    hashtagLength,
    hashtagInputText,
    changeHashtags,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
    handleEnterHashtag,
    hashtagRef,
    hashtagDeleteRef,
  };
}
