# TETRIO-Search
TETRIO 유저 전적을 검색할수 있습니다.

유저 이름을 입력한 뒤 엔터나 검색버튼을 클릭해서 검색합니다. (유저의 티어, 40 Lines 최고기록, Blitz 최고기록등을 알수있습니다.)
최근기록을 클릭한 후 리플레이 버튼을 눌러 리플레이를 볼수있습니다.

[TETRIO](https://tetr.io/)  
[TETRIO 전적검색 확장프로그램](https://chrome.google.com/webstore/detail/tetrio-search/dhikfeejdomhkbgghlhahhhokfndphnn?hl=ko)

# 폴더 구조

```bash
.
├─public
│  ├─design                 # 웹스토어 디자인 폴더
│  ├─images                 # 각종 이미지 폴더
│  ├─favicon.svg            # test 시 임시 아이콘
│  └─manifest.json          # manifest.json 필수파일!!!
├─src
│   ├─css
│   │  └─popup.css          # popup 디자인 파일
│   ├─html
│   │  └─popup.html         # popup 레이아웃 파일
│   └─js
│      ├─background.ts      # serviceworker (추가 지원 예정)
│      └─popup.ts           # popup 스크립트 파일
├─vite-env.d.ts             # 건들지 말 것
└─vite.config.ts            # vite 설정 파일
```

# 사용법

```bash
npm i
npm run dev                 # 프로그램 실행 시
npm run build               # 프로그램 배포 시
```

배포 시에는 무조건 `dist` 폴더를 가리킬 것!!!