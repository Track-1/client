## 💙서비스 이름, 팀명 및 프로젝트 소개

### 🚚 서비스 이름 : Track1

![Track1](https://user-images.githubusercontent.com/70846061/210478155-4e5110f4-fc47-4635-ac1e-d1bf4ef9ab18.png)

### 👨‍👩‍👦‍👦 팀명 : Tracker

![트래커](https://user-images.githubusercontent.com/70846061/210478421-3dd3d11d-471e-412a-b64e-802b5aa3ff92.jpeg)

### 📑 프로젝트 소개

✅ 한 줄 소개: 음악 프로듀서 - 보컬 매칭 플랫폼

✅ 간략 소개: 음악 프로듀서가 스케치 곡을 업로드하면 보컬이 이를 다운받아 녹음 후 업로드하여 보다 직관적으로 협업의 기회를 창출할 수 있는 매칭 플랫폼

## 🛠️ 기술 스택 및 사용 라이브러리

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

## 🗂 폴더구조

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

### \_\_\_ **TEST** \_\_\_

: jest 테스트함수 파일들이 위치한 폴더. 선택사항!

### _**@components**_

: 페이지에서 반복적으로 사용되는 컴포넌트들이 위치한 폴더.

미리 만들어놓은 @common 에는 header&footer 같이 전체적으로 사용되는 컴포넌트들이 들어가고, Modal에는 모달컴포넌트만 위치시킬께요! 나머지 컴포넌트들은 페이지별로 폴더를 생성해서 위치시켜주세요!! (폴더명은 core폴더와 동일하게!)

### _**@pages**_

: 라우팅되는 페이지들을 모아둔 폴더.

모든 페이지들을 미리 세팅 해놨어요. 거기서 작업하면 됩니다!! 혹시 페이지가 바뀌게 되면 혼자 바꾸지 말고 같이 상의해서 변경합시다!!

### _**assets/assets.d.ts**_

: 타입스크립트에서는 파일들을 import하기 위해서 미리 모듈들을 decalre 해줘야 해요!

### _**core**_

: 개발할 때 쓰는 더미데이터, 혹은 데이터가 담긴 객체&배열들을 따로 빼두는 곳이에요.
컴포넌트나 페이지 파일에서는 객체&배열을 선언하지 않고 꼭 import 해서 쓰도록 해요! (랜더링이 일어날 때마다 변수들이 선언되는건 불필요한 리소스 낭비)

### _**core/api**_

axios : 서버통신 함수를 선언하고 export 하는 곳

path : 라우팅 path들을 선언하고 export 하는 곳

나머지 : 페이지별로 파일을 만들어주세요!

### _**mock**_

: 서버 연결하기 전까지 클라이언트에서 더미데이터를 생성해서 서버처럼 쓸 수 있게 데이터를 mocking 하는 폴더! 아직 명세서 안나와서 비어있음.

### _**recoil**_

: 리코일폴더. 각자 공부하고 필요할 때 사용하도록 합니다!

### _**style**_

: 다 알죠?

### _**type**_

: 여러 데이터의 묶음을 interface 나 type으로 지정해줘야한다면, 컴포넌트에 직접 하지 않고 type 폴더에 파일을 만들고 export 합시다!

### _**utils**_

: 재사용할 수 있는 함수들 & 로직들을 모아두는 곳입니다!

hooks : 커스텀훅을 생성했을 때 여기에 위치시켜주세요!
