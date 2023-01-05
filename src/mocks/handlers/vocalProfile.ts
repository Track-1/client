import { rest } from "msw";

export const vocalProfileHandler = [
  rest.get("/profile/vocal/:vocalId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          isMe: true,
          vocalProfile: {
            profileImage: "AWS S3 이미지 파일",
            name: "프로듀서1",
            contact: "010-1234-5678",
            category: ["r&b", "hiphop"],
            keyword: ["잔잔한", "즐거운"],
            introduce: "프로듀서소개",
            isSelected: true,
          },
          vocalPortfolio: [
            {
              vocalPortfolioId: 1,
              jacketImage: "AWS S3 image url1",
              beatWavFile: "AWS S3 beat wav file url1",
              title: "제목1",
              content: "포트폴리오 내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              vocalPortfolioId: 6,
              jacketImage: "AWS S3 image url1",
              beatWavFile: "AWS S3 beat wav file url1",
              title: "제목6",
              content: "포트폴리오 내용",
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

  rest.post("/mypage/vocal", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
