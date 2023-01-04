import { rest } from "msw";

export const vocalSearchHandler = [
  rest.get("/vocals", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          vocalProfileImage: "AWS S3 bucket 보컬 프로필 URL",
          vocalTitleFile: "AWS S3 bucket 보컬 타이틀 wav 파일 URL",
          vocalName: "보컬3",
          category: ["R&B", "House"],
          keyword: ["잔잔한", "고요한"],
          totalCategNum: 8,
          wavFileLength: 210,
          isSelected: true,
        },
        {
          vocalProfileImage: "AWS S3 bucket 보컬 프로필 URL",
          vocalTitleFile: "AWS S3 bucket 보컬 타이틀 wav 파일 URL",
          vocalName: "보컬8",
          category: ["Jazz", "EDM"],
          keyword: ["클럽 분위기의", "신비로운"],
          totalCategNum: 5,
          wavFileLength: 210,
          isSelected: false,
        },
      ]),
    );
  }),

  rest.get("/vocals&categ=Hiphop&categ=rb&…&isSelected=True", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          vocalProfileImage: "AWS S3 bucket 보컬 프로필 URL",
          vocalTitleFile: "AWS S3 bucket 보컬 타이틀 wav 파일 URL",
          vocalName: "보컬3",
          category: ["R&B", "House"],
          keyword: ["잔잔한", "고요한"],
          isSelected: true,
          wavFileLength: 210,
          totalCategNum: 8,
        },
        {
          vocalProfileImage: "AWS S3 bucket 보컬 프로필 URL",
          vocalTitleFile: "AWS S3 bucket 보컬 타이틀 wav 파일 URL",
          vocalName: "보컬8",
          category: ["Jazz", "EDM"],
          keyword: ["클럽 분위기의", "신비로운"],
          isSelected: true,
          wavFileLength: 210,
          totalCategNum: 8,
        },
      ]),
    );
  }),
];
