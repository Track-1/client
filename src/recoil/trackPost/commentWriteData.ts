import { atom } from "recoil";
import { CommentDataType } from "../../type/trackPost/commentDataType";

export const commentWriteData = atom<CommentDataType>({
  key: "commentWriteData",
  default: { commentAudioFile: null, commentContent: "", commentAudioFileName: "file_upload.mp3" },
});
