import { SOURCE } from './sources';

const comments = () => {
  return {
    status: 200,
    success: true,
    message: '댓글 조회 성공',
    data: {
      commentList: Array.from({ length: 1 }, (_) => _).map(() => {
        return {
          commentUserId: SOURCE.getId(),
          commentId: SOURCE.getId(),
          commentAudioFile: SOURCE.getAudio(),
          userName: SOURCE.getUser(),
          userImageFile: SOURCE.getImage(),
          commentContent: '곡이 좋네요! 보컬 입힌 댓글 남깁니다~',
          userSelf: SOURCE.getBoolean(),
          commentAudioFileLength: SOURCE.getFileLength(),
          commentFileName: SOURCE.getTitle(),
        };
      }),
    },
  };
};

export { comments };
