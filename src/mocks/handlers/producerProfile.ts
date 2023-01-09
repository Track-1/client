import { rest } from "msw";
import portFolioImg from "../../assets/image/portFolioImg.png";
import ditto from "../../assets/audio/ditto.mp3";

export const producerProfileHandler = [
  rest.get("/profile/producer/:producerId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          isMe: false,
          producerProfile: {
            profileImage: portFolioImg,
            name: "프로듀서1",
            contact: "010-1234-5678",
            category: ["r&b", "hiphop"],
            keyword: ["잔잔한", "즐거운"],
            introduce: "프로듀서소개",
          },
          producerPortfolio: [
            {
              id: 1,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 2,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 3,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 4,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 5,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 6,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 7,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1",
              content: "내용",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 8,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
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
          id: 1,
          jacketImage: "AWS S3 image url1",
          beatWavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          content: "게시글 소개",
          keyword: ["신나는", "힙한"],
          category: "hiphop",
          wavFileLength: 210,
          isSelected: false,
        },
        {
          id: 3,
          jacketImage: "AWS S3 image url1",
          beatWavFile: "AWS S3 beat wav file url1",
          title: "제목1",
          content: "게시글 소개",
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
