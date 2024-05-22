import { SOURCE } from './sources';

export const trackDetail = () => {
  return {
    status: 200,
    success: true,
    message: '게시글 정보 조회 성공',
    data: {
      trackId: SOURCE.getId(),
      trackImageFile: SOURCE.getImage(),
      trackAudioFile: SOURCE.getAudio(),
      trackAudioFileName: SOURCE.getTitle(),
      trackTitle: SOURCE.getTitle(),
      trackUserName: SOURCE.getUser(),
      trackUserId: SOURCE.getId(),
      userImageFile: SOURCE.getImage(),
      trackIntroduction: '이 음악 앨범은 감각적인 멜로디와 깊은 가사로 구성되어 있습니다.',
      trackKeyword: SOURCE.getKeyword(),
      trackCategory: SOURCE.getCategory(),
      userSelf: SOURCE.getBoolean(),
      trackAudioFileLength: SOURCE.getFileLength(),
      trackClosed: SOURCE.getBoolean(),
    },
  };
};
