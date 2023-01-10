import { atom } from "recoil";

export const postIsCompleted = atom({
  key: "postIsCompleted",
  default: false,
});

export const postContentLength = atom({
  key: "postContentLength",
  default: 0,
});

export const postContent = atom({
  key: "postContent",
  default: ``,
});

export const postWavFile = atom({
  key: "postWavFile",
  default: null,
});

export const endPost=atom({
  key:"endPost",
  default:false,
})

// export const uploadCommentData=atom({
//   key: "uploadCommentData",
//   default: {
//     content: ``,
//     wavFile: null,
//   }
// })