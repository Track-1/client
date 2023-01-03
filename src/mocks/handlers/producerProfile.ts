import { rest } from "msw";

export const producerProfileHandler = [
  rest.get("/profile/producer/:producerId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          producerProfile: {
            profileImage: "AWS S3 이미지 파일",
            name: "프로듀서1",
            contact: "010-1234-5678",
            category: ["r&b", "hiphop"],
            keyword: ["잔잔한", "즐거운"],
            introduce: "프로듀서소개",
          },
          producerPortfolio: [
            {
              producerPortfolioId: 1,
              jacketImage: "AWS S3 image url1",
              beatWavFile: "AWS S3 beat wav file url1",
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              producerPortfolioId: 1,
              jacketImage: "AWS S3 image url1",
              beatWavFile: "AWS S3 beat wav file url1",
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
          ],
        },
      ]),
    );
  }),

  rest.get("/profile/producer/:producerId/beats", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          beatId: 1,
          jacketImage: "AWS S3 image url1",
          beatWavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          introduce: "게시글 소개",
          keyword: ["신나는", "힙한"],
          category: "hiphop",
          wavFileLength: 210,
          isSelected: false,
        },
        {
          beatId: 3,
          jacketImage: "AWS S3 image url1",
          beatWavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          introduce: "게시글 소개",
          keyword: ["신나는", "힙한"],
          category: "pop",
          wavFileLength: 215,
          isSelected: true,
        },
      ]),
    );
  }),

  rest.post("/mypage/producer", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
