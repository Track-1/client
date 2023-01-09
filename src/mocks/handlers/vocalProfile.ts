import { rest } from "msw";
import profileImg from "../../assets/image/profileImg.png";
import ditto from "../../assets/audio/ditto.mp3";
import bonfire from "../../assets/audio/bonfire.mp3";

export const vocalProfileHandler = [
  rest.get("/profile/vocal/:vocalId", async (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          isMe: true,
          vocalProfile: {
            profileImage: profileImg,
            name: "프로듀서1",
            contact: "010-1234-5678",
            category: ["r&b", "hiphop"],
            keyword: ["잔잔한", "즐거운"],
            introduce: "프로듀서소개",
            isSelected: true,
          },
          vocalPortfolio: [
            {
              id: 1,
              jacketImage: profileImg,
              beatWavFile: ditto,
              title: "ㅅㅂㅅㅂㅅㅂㅅㅂ",
              content:
                "오 난 부서진 날개들과 무너져 내린 성들 그 아래에 굳게 뛰지 않는 심장과 패배의 깃발들이 휘날리네 모두가 왕인 이 세상에 영웅 따윈 없었네 오 잔인한 격전에 눈이 덮일 때 당신의 빛들은 광풍이 되어 어련히 내 몸을 찢어내 흩어내쳐버리고 내 발 밑에 쓰러진 나의 꽃들과 도태에 잠겨버린 깊은 정원 속 당신의 사랑이 송두리째 사라져버린다",
              keyword: ["abcdefghij", "힙한", "힙한힙한한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: true,
            },
            {
              id: 2,
              jacketImage: profileImg,
              beatWavFile: bonfire,
              title: "fuckfuckcufcfucfuckfuckfcufk",
              content:
                "오 난 부서진 날개들과 무너져 내린 성들 그 아래에 굳게 뛰지 않는 심장과 패배의 깃발들이 휘날리네 모두가 왕인 이 세상에 영웅 따윈 없었네 오 잔인한 격전에 눈이 덮일 때 당신의 빛들은 광풍이 되어 어련히 내 몸을 찢어내 흩어내쳐버리고",
              keyword: ["abcdefghij", "힙한", "힙"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 3,
              jacketImage: profileImg,
              beatWavFile: ditto,
              title: "제목6제목6제목6제목6제목6",
              content:
                "오 난 부서진 날개들과 무너져 내린 성들 그 아래에 굳게 뛰지 않는 심장과 패배의 깃발들이 휘날리네 모두가 왕인 이 세상에 영웅 따윈 없었네",
              keyword: ["abcdefghij", "힙한", "힙한한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 4,
              jacketImage: profileImg,
              beatWavFile: bonfire,
              title: "제목6제목6제목6",
              content:
                "오 난 부서진 날개들과 무너져 내린 성들 그 아래에 굳게 뛰지 않는 심장과 패배의 깃발들이 휘날리네",
              keyword: ["힙한힙한한", "힙한"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 5,
              jacketImage: profileImg,
              beatWavFile: ditto,
              title: "제목6제목6",
              content: "오 난 부서진 날개들과 무너져 내린 성들",
              keyword: ["abcdefghij"],
              category: "hiphop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 6,
              jacketImage: profileImg,
              beatWavFile: bonfire,
              title: "DittoDittoDittoDittoDittoDitto",
              content: "포트폴리오 내용",
              keyword: ["잔잔한음악", "힙한"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 7,
              jacketImage: profileImg,
              beatWavFile: ditto,
              title: "DittoDittoDitto",
              content: "포트폴리오 내용",
              keyword: ["잔잔한", "힙한", "음악"],
              category: "pop",
              wavFileLength: 210,
              isTitle: false,
            },
            {
              id: 8,
              jacketImage: profileImg,
              beatWavFile: bonfire,
              title: "Ditto",
              content: "포트폴리오 내용",
              keyword: ["잔잔한음악"],
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
