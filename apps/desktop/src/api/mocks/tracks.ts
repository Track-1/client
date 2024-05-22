import { SOURCE } from './sources';

export const tracks = () => {
  return {
    status: 200,
    success: true,
    message: 'Filtering 조회 성공',
    data: {
      trackList: Array.from({ length: 10 }, (_) => _).map(() => {
        return {
          trackId: SOURCE.getId(),
          trackImageFile: SOURCE.getImage(),
          trackAudioFile: SOURCE.getAudio(),
          trackTitle: SOURCE.getTitle(),
          trackUserId: SOURCE.getId(),
          trackUserName: SOURCE.getUser(),
          trackKeyword: SOURCE.getKeyword(),
          trackCategory: SOURCE.getCategory(),
          trackAudioFileLength: SOURCE.getFileLength(),
        };
      }),
    },
  };
};
