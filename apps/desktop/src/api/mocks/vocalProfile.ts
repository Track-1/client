import { SOURCE } from './sources';

export const vocalProfile = () => {
  return {
    status: 200,
    success: true,
    message: '보컬 프로필 조회 성공',
    data: {
      userType: 'vocal',
      userSelf: true,
      userProfile: {
        userId: SOURCE.getId(),
        userImageFile: SOURCE.getImage(),
        userName: SOURCE.getUser(),
        userContact: '010-2355-5789',
        userCategory: [SOURCE.getCategory()],
        userKeyword: SOURCE.getKeyword(),
        userIntroduction: '감정 표현과 유연한 음색으로 청중의 마음을 사로잡습니다.',
        userTrackSearch: SOURCE.getBoolean(),
      },
      userPortfolio: Array.from({ length: 10 }, (_) => _).map(() => {
        return {
          portfolioId: SOURCE.getId(),
          portfolioImageFile: SOURCE.getImage(),
          portfolioAudioFile: SOURCE.getAudio(),
          portfolioAudioFileName: SOURCE.getTitle(),
          portfolioTitle: SOURCE.getTitle(),
          portfolioContent:
            "복선이 저절로 배치되지 않은 채 갑작스러운 반전이 일어나면 반감을 사기 쉽다. 그리고 작품을 부정적으로 평가할 때 개연성이라는 표현을 남용하는 경향이 있기 때문에, 복선 없는 반전을 '개연성이 없다'라고 칭하는 경우가 많다. 그러나 엄밀히 말해서 복선은 존재하는 것이 더 개연성이 없는 것이다. 많은 감상자들이 복선 없는 반전에 어색함이나 반감을 가지는 것은 그것이 개연성이 없어서가 아니라, 인간의 감정적 본성과 장르의 관습 때문일 뿐이다.",
          portfolioKeyword: SOURCE.getKeyword(),
          portfolioCategory: SOURCE.getCategory(),
          portfolioAudioFileLength: SOURCE.getFileLength(),
        };
      }),
    },
  };
};
