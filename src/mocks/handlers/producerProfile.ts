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
              title: "제목제목제목제목제목제목제목제목제목제목제목제목제목제목",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도 거부당한 이야기들 모두 끌어안고 나와 함께 울어주세요 무성한 미움이 자라나고 비탄한 눈물이 몰아쳐도 나는 언제나 여기에 있을 거야 불어라 푸른 바람 황혼을 쫓아 영원을 싣고 저 멀리 날아가라 오늘이 이 세계의 마지막 밤이라도 시공을 넘어 구름을 건너 가자 저 섬을 향해",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 2,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "DittoDittoDittoDittoDittoDittoDittoDittoDitto",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도 거부당한 이야기들 모두 끌어안고 나와 함께 울어주세요 무성한 미움이 자라나고 비탄한 눈물이 몰아쳐도 나는 언제나 여기에 있을 거야 불어라 푸른 바람 황혼을 쫓아 영원을 싣고 저 멀리 날아가라",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 3,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "DittoDittoDitto",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도 거부당한 이야기들 모두 끌어안고 나와 함께 울어주세요 무성한 미움이 자라나고 비탄한 눈물이 몰아쳐도 나는 언제나 여기에 있을 거야 불어라",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 4,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "Ditto",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도 거부당한 이야기들 모두 끌어안고 나와 함께 울어주세요 무성한 미움이 자라나고 비탄한 눈물이 몰아쳐도",
              keyword: ["신나는", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 5,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도 거부당한 이야기들 모두 끌어안고 나와 함께 울어주세요",
              keyword: ["신나는", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 6,
              jacketImage: portFolioImg,
              beatWavFile: ditto,
              title: "제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1제목1",
              content: "이곳의 이름을 지어야해 내게 이름이 없다고 해도",
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
              content: "이곳의 이름을 지어야해",
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
