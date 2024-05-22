import { SOURCE } from './sources';

export const vocals = () => {
  return {
    status: 200,
    success: true,
    message: '보컬 필터링 검색 성공',
    data: {
      vocalList: Array.from({ length: 20 }, (_) => _).map(() => {
        return {
          userId: SOURCE.getId(),
          userImageFile: SOURCE.getImage(),
          userAudioFile: SOURCE.getAudio(),
          userName: SOURCE.getUser(),
          userCategory: [SOURCE.getCategory()],
          userKeyword: SOURCE.getKeyword(),
          userCategoryNum: SOURCE.getCategory(),
          userAudioFileLength: SOURCE.getFileLength(),
          userTitle: SOURCE.getTitle(),
          userTrackSearch: SOURCE.getBoolean(),
        };
      }),
    },
  };
};
