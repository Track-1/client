<div align=center>
  <img src="https://user-images.githubusercontent.com/70846061/211734675-ab9fb60b-58c6-4c99-b658-5e51cb26cb43.png">

## _Discorver Your Limitless Track_

</div>

## 💜 음악 프로듀서 - 보컬 매칭 플랫폼

![Slide 16_9 - 56](https://user-images.githubusercontent.com/70846061/211738080-719a7470-af38-49fe-aea9-8db24f39eb53.png)

### [프로젝트 소개]

음악 프로듀서가 스케치 곡을 업로드하면 보컬이 이를 다운받아 녹음 후 업로드하여 보다 직관적으로 협업의 기회를 창출할 수 있는 매칭 플랫폼

<<<<<<< HEAD

=======

## 💜 페이지 별 핵심기능

## Track Searh(프로듀서가 올린 음악을 볼 수 있는 페이지)

<img width="1440" alt="트랙1" src="https://user-images.githubusercontent.com/70846061/211752462-805c0ea4-3135-4b86-9b54-2a21d818c4d1.png">
- 뮤직 플레이어 : 프로듀서가 올린 음원을 재생.
<img width="1439" alt="KakaoTalk_Photo_2023-01-11-17-21-57 004" src="https://user-images.githubusercontent.com/70846061/211754589-e6307113-4ccb-4c47-ab08-b5d8ddb94abf.png">
- 필터링 : 장르별 필터링을 통해 장르별 곡 확인
<img width="1440" alt="스크린샷 2023-01-11 오후 5 21 15" src="https://user-images.githubusercontent.com/70846061/211754719-6ed54966-332d-4015-999c-d5de3e61699d.png">
- 무한 스크롤 : 데이터베이스에 있는 모든 트랙데이터를 무한스크롤로 확인.<br><br><br>

## Comment(프로듀서가 올린 음악에 보컬을 입혀 올릴 수 있는 페이지)

<img width="1440" alt="트랙2" src="https://user-images.githubusercontent.com/70846061/211752482-b64494ec-88b8-4e09-a294-171ab4207f33.png">
<img width="1440" alt="트랙3" src="https://user-images.githubusercontent.com/70846061/211752498-01b07ca4-ef1f-4aa8-97f9-1014485d6853.png">
- 보컬 댓글 Post : producer의 음원에 보컬녹음하여 comment를 통해 음원과 설명글 업로드.<br><br><br>

## Vocal(보컬의 음악을 볼 수 있는 페이지)

<img width="1440" alt="보컬1" src="https://user-images.githubusercontent.com/70846061/211757208-c46f2c39-1e3f-4285-9e0e-2d5b650738d1.png">
<img width="1440" alt="보컬2" src="https://user-images.githubusercontent.com/70846061/211757222-e30be678-5a63-4969-bc85-383fc2384d4a.png">
<img width="1440" alt="보컬3" src="https://user-images.githubusercontent.com/70846061/211757231-4674cfc2-8596-4b86-bc4c-1387a9a391ee.png">

## Profile(보컬,프로듀서 프로필확인 페이지)

![image](https://user-images.githubusercontent.com/70846061/211759877-e53662df-703e-40df-bfee-8e7fd8c272df.png)

- 무한스크롤 : 업로드한 자신의 음원데이터를 무한스크롤로 확인.<br><br><br>

### 5. Upload(보컬-포트폴리오 / 프로듀서-포트폴리오or게시글)

<img width="1440" alt="업로드1" src="https://user-images.githubusercontent.com/70846061/211758734-999394d4-3623-4c5b-9293-461cac89151f.png">
<img width="1440" alt="업로드2" src="https://user-images.githubusercontent.com/70846061/211758747-63a64234-a853-42a8-bbda-7f5d4b172fbb.png">
<img width="1440" alt="업로드3" src="https://user-images.githubusercontent.com/70846061/211758771-325dbf3a-89ea-454a-9116-6355ab8d5ea1.png">
- 필터링 : 장르별 필터링을 통해 장르별 곡 확인
- 뮤직 플레이어 : 보컬이 올린 음원을 재생.

- Track/Portfolio Post : UserType에 따라서 게시글을 업로드.<br><br><br>

> > > > > > > 97c3720101129243a8238f25ea96db6f221626f7

## 💜 기술 스택 및 사용 라이브러리

![기술스택](https://user-images.githubusercontent.com/70846061/210489329-c03c1357-ce80-49cb-a2b6-32b800a3765a.png)

```
  "axios": "^1.2.1",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-query": "^3.39.2",
  "react-router-dom": "^6.5.0",
  "react-scripts": "5.0.1",
  "recoil": "^0.7.6",
  "styled-components": "^5.3.6",
  "styled-reset": "^4.4.4",
  "typescript": "^4.9.4",
  "web-vitals": "^2.1.0"
```

## 💜 폴더구조

```
├── __test
│
├── .gitgub
│
├── public
│
├── src
│   ├── @components
│   │   ├── @common
│   │   ├── modal
│   │   ├── //
│   │
│   ├── @pages
│   │   ├── mainPage
│   │   ├── producerProfilePage
│   │   ├── trackPostPage
│   │   ├── trackPage
│   │   ├── vocalProfilePage
│   │   └── vocalPage
│   │
│   ├── assets
│   │   ├── audio
│   │   ├── icon
│   │   ├── image
│   │   └── assets.d.ts
│   │
│   ├── core
│   │   ├── api
│   │   │   ├── axios
│   │   │   └── path
│   │   ├── main
│   │   ├── producerProfile
│   │   ├── trackPost
│   │   ├── tracks
│   │   ├── vocalProfile
│   │   └── vocals
│   │
│   ├── mocks
│   │
│   ├── recoil
│   │
│   ├── style
│   │   ├── globalStyle
│   │   ├── style.d.ts
│   │   └── theme
│   │
│   ├── type
│   └── utils
│       └── hooks
│
├── App
├── index
└── Router

```

# _💜Tracker💚_

<div align=center>
  <img src="https://user-images.githubusercontent.com/70846061/210478421-3dd3d11d-471e-412a-b64e-802b5aa3ff92.jpeg">
</div>
