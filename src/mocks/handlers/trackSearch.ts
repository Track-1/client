import { rest } from "msw";

export const trackSearchHandler = [
  rest.get("/tracks", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          beatId: 1,
          jacketImage: "AWS S3 image url1",
          wavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          producerName: "프로듀서1",
          keyword: ["신나는", "힙한"],
          category: "hiphop",
          wavFileLength: 210,
        },
        {
          beatId: 2,
          jacketImage: "AWS S3 image url2",
          wavFile: "AWS S3 beat wav file url2",
          title: "제목2",
          producerName: "프로듀서2",
          keyword: ["묵직한", "프레쉬한"],
          category: "R&B",
          wavFileLength: 260,
        },
      ]),
    );
  }),

  rest.get("/tracks&categ=2&categ=3", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          beatId: 1,
          jacketImage: "AWS S3 image url1",
          wavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          producerName: "프로듀서1",
          keyword: ["신나는", "힙한"],
          category: "hiphop",
          wavFileLength: 210,
        },
        {
          beatId: 2,
          jacketImage: "AWS S3 image url2",
          wavFile: "AWS S3 beat wav file url2",
          title: "제목2",
          producerName: "프로듀서2",
          keyword: ["묵직한", "프레쉬한"],
          category: "R&B",
          wavFileLength: 260,
        },
      ]),
    );
  }),
];
