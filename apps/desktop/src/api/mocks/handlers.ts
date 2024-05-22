import { HttpResponse, http } from 'msw';
import { COMMENTS, MYPAGE, PROFILE, TRACKS, USER, VOCALS } from '../path';
import { tracks } from './tracks';
import { trackDetail } from './trackDetails';
import { vocals } from './vocals';
import { vocalProfile } from './vocalProfile';
import { producerPortfilio, producerProfile } from './producerProfile';
import { comments } from './comments';
import { loginData } from './login';
import { FilteredTrackType } from '../../type/tracks';

export const handlers = [
  http.get<FilteredTrackType>(TRACKS.FILTERED_LIST, () => {
    return HttpResponse.json(tracks());
  }),

  http.get(TRACKS.DETAIL, () => {
    return HttpResponse.json(trackDetail());
  }),

  http.get(VOCALS.FILTERED_LIST, () => {
    return HttpResponse.json(vocals());
  }),

  http.get(PROFILE.VOCAL_PROFILE, () => {
    return HttpResponse.json(vocalProfile());
  }),

  http.get(PROFILE.VOCAL_INFO, () => {
    return HttpResponse.json(vocalProfile());
  }),

  http.get(PROFILE.PRODUCER_PROFILE, () => {
    return HttpResponse.json(producerProfile());
  }),

  http.get(PROFILE.PRODUCER_INFO, () => {
    return HttpResponse.json(producerPortfilio());
  }),

  http.get(COMMENTS.LIST, () => {
    return HttpResponse.json(comments());
  }),

  http.post(TRACKS.POST, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '트랙 게시글 작성 성공',
      data: {
        trackId: 1,
      },
    });
  }),

  http.patch(TRACKS.DETAIL, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '트랙 게시글 수정 성공',
      data: {
        trackId: 2,
      },
    });
  }),

  http.patch(TRACKS.TRACK_CLOSE, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '게시글 마감 업데이트 성공',
      data: {
        trackClosed: true,
      },
    });
  }),

  http.delete(TRACKS.DETAIL, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '게시글 삭제 성공',
      data: {
        userId: 1,
      },
    });
  }),

  http.post(COMMENTS.POST, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '트랙 게시글 업로드 성공',
      data: {
        commentId: 2,
      },
    });
  }),

  http.patch(COMMENTS.PATCH, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '댓글 수정 성공',
      data: {
        commentAudioFile:
          'https://vocal-comment-bucket.s3.ap-northeast-2.amazonaws.com/1676874657055-%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%A8%E1%84%8B%E1%85%B4%20%E1%84%8C%E1%85%A5%E1%84%91%E1%85%A7%E1%86%AB%E1%84%8B%E1%85%B3%E1%84%85%E1%85%A9_%E1%84%90%E1%85%A1%E1%86%B8%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%28%E1%84%87%E1%85%A9%E1%84%8F%E1%85%A5%E1%86%AF%29.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCCROMAZWQ2%2F20230220%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230220T063101Z&X-Amz-Expires=900&X-Amz-Signature=493eb0b21c130996f3d644a230764b551c54df98b7ca740d758f3580d7bc34f0&X-Amz-SignedHeaders=host',
        userName: 'vocalExample8',
        commentContent: '수정내용~~',
        commentAudioFileLength: 107.807375,
      },
    });
  }),

  http.delete(COMMENTS.DELETE, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '댓글 삭제 성공',
      data: {
        userId: 1,
        trackId: 5,
      },
    });
  }),

  http.post(MYPAGE.UPLOAD_PRODUCER_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '프로듀서 포트폴리오 업로드 성공',
      data: {
        portfolioId: 10,
        userTitleId: 1,
      },
    });
  }),

  http.post(MYPAGE.UPLOAD_VOCAL_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '보컬 포트폴리오 작성 성공',
      data: {
        portfolioId: 10,
        userTitleId: 1,
      },
    });
  }),

  http.patch(MYPAGE.PATCH_PRODUCER_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '프로듀서 포트폴리오 수정 성공',
      data: {
        portfolioId: 5,
        userId: 3,
      },
    });
  }),

  http.patch(MYPAGE.PATCH_VOCAL_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '보컬 포트폴리오 수정 성공',
      data: {
        portfolioId: 4,
        userId: 10,
      },
    });
  }),

  http.patch(MYPAGE.PATCH_PRODUDCER_TITLE, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '프로듀서 타이틀 수정 성공',
      data: {
        bef: 5,
        aft: 4,
      },
    });
  }),

  http.delete(MYPAGE.DELETE_PRODUCER_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '프로듀서 포트폴리오 삭제 성공',
      data: {
        userId: 3,
      },
    });
  }),

  http.delete(MYPAGE.DELETE_VOCAL_PORTFOLIO, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '보컬 포트폴리오 삭제 성공',
      data: {
        userId: 5,
      },
    });
  }),

  http.patch(PROFILE.PATCH_VOCAL, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '보컬 프로필 수정 성공',
      data: {
        userName: '변경테스트',
        userType: 'vocal',
        userId: 10,
        userEmail: 'vocalExample8@naver.com',
        userImageFile:
          'https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/vocalProfileImage/1676885463732-Ellipse%2073.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCCROMAZWQ2%2F20230220%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230220T093104Z&X-Amz-Expires=900&X-Amz-Signature=cc336da46e6221db3bda73b2515a584bfbb21dbbd173982e2eacdbca56a11bcc&X-Amz-SignedHeaders=host',
      },
    });
  }),

  http.patch(PROFILE.PATCH_PRODUCER, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '프로듀서 프로필 수정 성공',
      data: {
        userName: '변경테스트',
        userType: 'producer',
        userId: 3,
        userEmail: 'producerExample3@naver.com',
        userImageFile:
          'https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/producerProfileImage/1676884024896-%5Binstiz%5D%20MAMAMOO%20WEARING%20CASUAL%20CLOTHES%20AT%20THEIR%20CONCERT.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCCROMAZWQ2%2F20230220%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230220T090705Z&X-Amz-Expires=900&X-Amz-Signature=221fc783c424924784849d31d5f179a4cecb8fb51326ae7fd107cd3b218eabbb&X-Amz-SignedHeaders=host',
      },
    });
  }),

  http.post(USER.JOIN, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '회원 가입 성공',
      data: {
        userResult: {
          userId: 1,
          userName: 'producerExample5',
          userType: 'producer',
          userEmail: 'producerExample5@naver.com',
        },
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MSwiaWF0IjoxNjg5NDM0NDAyLCJleHAiOjE2ODk0MzgwMDJ9.7X7z-iD4c1Orq2Dvv0YyDrqILe34U9_5CouNNyLSzVs',
      },
    });
  }),

  http.patch(USER.JOIN_PROFILE, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '유저 프로필 수정 성공',
      data: {
        userId: 6,
        userName: 'vocalExample6',
        userType: 'vocal',
      },
    });
  }),

  http.post(USER.AUTH_LOGIN, () => {
    return HttpResponse.json(loginData());
  }),

  http.get(USER.AUTH_LOGOUT, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '로그아웃 성공',
    });
  }),

  http.get(USER.AUTH_REFRESH, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '토큰 재발급 성공',
      data: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjc2NTk4MjE2LCJleHAiOjE2NzY2MDE4MTZ9.zvC_N-iap0yg4i4aWndNWFxA2kfyvJGrlglXBSvPunI',
    });
  }),

  http.post(USER.BASIC_EMAIL, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '이메일 중복 검사 완료',
      data: {
        emailExists: true,
        userEmail: 'vocalExample5@naver.com',
      },
    });
  }),

  http.patch(USER.BASIC_PASSWORD, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '유저 비밀번호 변경 성공',
      data: {
        userId: 1,
        userName: 'producerExample5',
        userEmail: 'producerExample5@naver.com',
        userType: 'producer',
      },
    });
  }),

  http.post(USER.MAIL_SEND, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '인증코드 생성 성공',
      data: {
        userType: 'vocal',
        userEmail: 'vocalExample@naver.com',
        userCode: '6yN1h3VW',
      },
    });
  }),

  http.post(USER.MAIL_VERIFY, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '인증코드 생성 성공',
      data: {
        userType: 'vocal',
        userEmail: 'vocalExample@naver.com',
        userCode: '6yN1h3VW',
      },
    });
  }),

  http.patch(USER.MAIL_SEND_RE, () => {
    return HttpResponse.json({
      status: 201,
      success: true,
      message: '인증코드 재생성 성공',
      data: {
        userType: 'vocal',
        userEmail: 'dahyun_ee@naver.com',
        userCode: 'GLURCdHI',
      },
    });
  }),

  http.post(USER.MAIL_RESET_PASSWORD, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '비밀번호 재설정 메일 전송 성공',
      data: {
        userId: 1,
        userEmail: 'producerExample5@naver.com',
        userType: 'producer',
        userToken: '83bae35b0462728ac9ad7f0850c940e15295d3de',
      },
    });
  }),

  http.patch(USER.MAIL_RESET_PASSWORD_RE, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '비밀번호 재설정 메일 전송 성공',
      data: {
        userId: 1,
        userEmail: 'producerExample5@naver.com',
        userType: 'producer',
        userToken: 'afe85b6b1bf811e401d5c0c7dc74116a078a5d98',
      },
    });
  }),

  http.get(USER.MAIL_PASSWORD_TOKEN, () => {
    return HttpResponse.json({
      status: 200,
      success: true,
      message: '유효한 토큰입니다.',
      data: '4e9c4ed7998a7c7bb675d9956e24d223e1a7e07a',
    });
  }),
];
