import { rest } from "msw";
import bonfire from "../../assets/audio/bonfire.mp3";

export const trackPostHandler = [
  rest.get("/tracks/:beatId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          beatId: 1,
          jacketImage: "AWS S3 image url1",
          beatWavFile: bonfire,
          title: "제목1",
          producerName: "프로듀서1",
          producerId: 1,
          producerProfileImage: "AWS S3 profile image file url1",
          introduce: "게시글 소개",
          keyword: ["신나는", "힙한"],
          category: "hiphop",
          isMe: true,
          wavFileLength: 210,
          isClosed: false, // 마감여부 -> 마감 안함=False
        },
      ]),
    );
  }),

  rest.get("/tracks/comments/:beatId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          commentId: 5,
          vocalWavFile: "AWS S3 vocal wav file url1",
          vocalName: "보컬1",
          vocalProfileImage: "AWS S3 vocal profile image file url1",
          comment: "보컬 코멘트",
          isMe: false,
          vocalWavFileLength: 210,
        },
        {
          commentId: 18,
          vocalWavFile: "AWS S3 vocal wav file url2",
          vocalName: "보컬1",
          vocalProfileImage: "AWS S3 vocal profile image file url1",
          comment: "보컬 코멘트",
          isMe: true,
          vocalWavFileLength: 211,
        },
      ]),
    );
  }),

  rest.post("/tracks/:beatId", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),

  rest.get("/tracks/:beatId/download", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          status: 200,
          success: true,
          message: "게시글 다운로드 성공",
          data: {
            beatId: 1,
            wavFile: "파일자체",
            wavFileLength: 300,
          },
        },
      ]),
    );
  }),
];
