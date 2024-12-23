![readme_프론트엔드_v3](https://github.com/user-attachments/assets/8e48b5ce-a9b6-49dd-8a27-6e3afe2b69d7)

# 📌 Quostomize-fe: 우리 커스터마이징
## 📝 프로젝트 소개

**우리 커스터마이징(QUOSTOMIZE)** 은 사용자가 매달 자신의 생활 패턴과 취향에 맞게 카드 혜택과 포인트 사용처를 직접 선택할 수 있는 서비스입니다.

**사용자가 직접 결정하는 맞춤형 혜택 제공**을 통해 기존 카드 서비스의 한계를 뛰어넘고, 변화하는 소비 트렌드에 유연하게 대응합니다.

### 👉🏻 [시연영상 바로가기](https://youtu.be/4sCnBonI3yI)
### 👉🏻 [사이트 바로가기](https://quostomizecard.site/home)
<br>

## 🚀 주요 설계 방향 
본 프로젝트는 **서비스 보안**과 **안정성 강화**를 주요 설계 방향으로 두고 개발되었습니다.

**1. 보안과 안정성 강화**
  - Next.js + Auth.js
    - 토큰을 브라우저 쿠키 대신 서버 세션에 저장하여 데이터 직접 노출 방지
  - Next.js API Route
    - 클라이언트-백엔드 간 직접 통신을 차단해 헤더 정보 및 API 주소 보호
  - JWT 보안 강화
    - 비밀번호는 단방향 암호화, 개인정보는 양방향 암호화 적용
    - Acess/Refresh Token 검증 및 Blacklist 로직 추가로 보안 수준 향상

**2. 멱등성 적용**
  - Redis를 활용한 멱등키 관리로 카드 생성 요청 중복 처리 방지
  - 동일한 요청은 캐시된 응답 반환으로 효율성과 안정성 확보

**3. 대량 데이터 처리**
  - 배치 프로세스: 복권 응모 데이터를 매일 정해진 시간에 처리
    - Redaer: 1000명 데이터 읽어오기
    - Processor: 응모자 중 당첨자 선정
    - Writer: 당첨 결과 기록

**4. 코드 품질 관리**
  - SonarQube를 통한 정적 코드 분석으로 코드 품질 유지
  - DB Lock으로 동시성 문제 해결
  - 비동기 처리 강화로 안정적인 예외 처리 구현

<br>

## 🔧 주요 기능
**1. 카드 혜택 - 혜택 선택의 자유**
![34](https://github.com/user-attachments/assets/169c99d9-17cd-4d44-b4b2-476fafd96a86)

   - 상위분류 혜택: 5가지 상위분류 선택 시 모든 가맹점에서 3% 적립
   - 맞춤형 혜택: 세부 가맹점 그룹 선택 시 최대 4% 적립
   - 유연한 변경: 30일마다 혜택 변경 가능

**2. 포인트 사용처 - 포인트 사용의 다양성**
![33](https://github.com/user-attachments/assets/232873f0-1275-4ef4-a2e6-3441331fd3a8)

   - 페이백: 카드 결제일에 포인트를 현금처럼 사용
   - 조각투자: 원하는 주식을 설정하고 포인트로 주식 매수
   - 일일복권: 매일 자정 추첨으로 최대 1만 포인트 지급

**3. 카드 생성 - 실제 카드 생성 프로세스와 멱등성을 적용한 생성 기능**
![커스터 마이징 서비스 (2)](https://github.com/user-attachments/assets/21f776ea-d0e6-4ff1-86a2-b4ab0807902b)

**4. 주식 기능**
![커스터 마이징 서비스 (3)](https://github.com/user-attachments/assets/cd6526f6-cc32-4161-a033-87d44d88365e)

   - RestClient를 활용한한국투자증권 OPENAPI와 연동
   - Access Token 발급 & 보유 주식 정보 기능
   - S3를 활용한 주식 이미지 다운로드

**5. 복권 기능**
![커스터 마이징 서비스 (4)](https://github.com/user-attachments/assets/5640c409-79a2-42f8-84c9-dc1ab16c1a29)

   - Spring Batch를 활용해 복권 기능을 활성화한 사용자 집계
   - 자정(00:00)에 1/1000 확률로 포인트 획득


<br>

## ⚙️ 기술 스택
![image](https://github.com/user-attachments/assets/580632dd-5717-49b5-9fb7-1658a2b68a2a)
<br>

## 🌐 프론트 배포 파이프라인
관리자 페이지는 Vercel을 이용해 배포를 진행하였습니다. Vercel 대시보드를 통해 배포 상태를 한눈에 확인할 수 있습니다.
<br>

**배포 과정**
1. 커밋 푸시: Github에 브랜치로 푸시합니다.
2. Vercel 배포: 메인 브랜치 병합 후 Vercel에 배포합니다.
3. 실시간 업데이트: Vercel을 통해 관리자 사이트가 즉시 업데이트됩니다.
<br>

## 🖥️ 인프라 구조도
![image](https://github.com/user-attachments/assets/aeb76baa-ece2-40fd-8ed6-18205d223d69)


## 🗂️ 주요 폴더 구조
```
root/
├── app/
│   ├── (fullscreen)/
│   │   ├── card-benefit-details/
│   │   ├── create-card/
│   │   ├── my-page/
│   │   ├── sign-up/
│   │   └── layout.jsx
│   ├── (nav)/
│   │   ├── benefit-change/
│   │   ├── find-id/
│   │   ├── find-password/
│   │   ├── home/
│   │   ├── login/
│   │   ├── lotto/
│   │   ├── my-card/
│   │   ├── piece-stock/
│   │   ├── qna/
│   │   └── layout.jsx
│   └── api/
│       ├── auth/
│       └── API 연결이 필요한 서비스
│           ├── (fullscreen 관련 API)
│           ├── (nav 관련 API)
│           └── 기타 공통 API
├── components/
│   ├── box/
│   ├── bubble/
│   ├── button/
│   ├── calendar/
│   ├── card/
│   ├── graph/
│   ├── header/
│   ├── navigationbar/
│   └── overlay/
├── public/
│   ├── cards-images/
│   ├── icons/
│   ├── images/
│   └── lotties/
├── utils/
│   ├── loginValid.js
│   └── getYYYYMMDDDate.js
├── auth.js
├── middleware.js
├── jsconfig.json
├── next.config.mjs
├── tailwind.config.js
├── .env.local
├── package.json
├── pnpm-lock.yaml
└── postcss.config.js
```
<br>

## 📅 진행 일정 (20Days)
- 프로젝트 시작일: 2024.11.19.
- 프로젝트 종료일: 2024.12.08.
<br>

## 💻 개발 환경
<table>
  <thead>
    <tr>
      <th>카테고리</th>
      <th>라이브러리</th>
      <th>설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">프레임워크 & 코어</td>
      <td><strong>Next.js (v15.0.2)</strong></td>
      <td>React 기반의 풀스택 웹 프레임워크로 SSR 및 SSG를 지원</td>
    </tr>
    <tr>
      <td><strong>React (v18.3.1)</strong></td>
      <td>선언형 사용자 인터페이스를 개발하기 위한 라이브러리</td>
    </tr>
    <tr>
      <td rowspan="7">UI & 아이콘콘</td>
      <td><strong>Emotion (v11.13)</strong></td>
      <td>CSS-in-JS 방식을 지원하여 동적 스타일링을 간단하게 구현</td>
    </tr>
    <tr>
      <td><strong>Material-UI (v6.1.7)</strong></td>
      <td>Google의 Material Design 기반 UI 컴포넌트 라이브러리</td>
    </tr>
    <tr>
      <td><strong>Headless UI (v2.2.0)</strong></td>
      <td>접근성 표준을 준수하는 UI 컴포넌트 라이브러리, 디자인 커스터마이징 용이</td>
    </tr>
    <tr>
      <td><strong>Floating UI (v0.26.28)</strong></td>
      <td>팝오버, 툴팁 등 UI 요소의 위치를 정교하게 제어</td>
    </tr>
    <tr>
      <td><strong>Lucide React (v0.460.0)</strong></td>
      <td>모던한 스타일의 오픈소스 아이콘 세트</td>
    </tr>
    <tr>
      <td><strong>React Icons (v5.3.0)</strong></td>
      <td>다양한 스타일의 아이콘을 지원하는 React 아이콘 라이브러리</td>
    </tr>
    <tr>
      <td><strong>Material Icons (v1.13.12)</strong></td>
      <td>Google의 Material Design 가이드 기반 아이콘</td>
    </tr>
    <tr>
      <td>인증</td>
      <td><strong>NextAuth.js (v5.0.0-beta.25)</strong></td>
      <td>OAuth, Credentials 등 다양한 인증 방식을 간편하게 구현</td>
    </tr>
    <tr>
      <td rowspan="4">애니메이션 & 시각 효과</td>
      <td><strong>GSAP (v3.12.5)</strong></td>
      <td>고성능 애니메이션, 타임라인 기반의 애니메이션 구현</td>
    </tr>
    <tr>
      <td><strong>Lottie Web (v5.12.2)</strong></td>
      <td>After Effects 애니메이션을 웹에서 JSON 파일로 쉽게 재생</td>
    </tr>
    <tr>
      <td><strong>Canvas Confetti (v1.9.3)</strong></td>
      <td>캔버스를 활용한 가벼운 컨페티 효과 제공</td>
    </tr>
    <tr>
      <td><strong>React Slot Counter (v3.0.1)</strong></td>
      <td>숫자를 애니메이션으로 카운팅하는 기능 제공</td>
    </tr>
    <tr>
      <td rowspan="2">데이터 시각화</td>
      <td><strong>Chart.js (v4.4.6)</strong></td>
      <td>반응형 차트를 쉽게 생성할 수 있는 데이터 시각화 라이브러리</td>
    </tr>
    <tr>
      <td><strong>Chartjs Plugin Datalabels (v2.2.0)</strong></td>
      <td>차트에 데이터 라벨을 추가하여 정보를 시각적으로 강조</td>
    </tr>
    <tr>
      <td rowspan="3">유틸리티</td>
      <td><strong>UUID (v11.0.3)</strong></td>
      <td>중복되지 않는 고유 식별자를 생성</td>
    </tr>
    <tr>
      <td><strong>js-cookie (v3.0.5)</strong></td>
      <td>브라우저 쿠키를 간편하게 설정하고 관리</td>
    </tr>
    <tr>
      <td><strong>React Intersection Observer (v9.13.1)</strong></td>
      <td>특정 요소가 뷰포트에 들어왔는지 감지하여 lazy loading 등 기능 구현</td>
    </tr>
    <tr>
      <td>E2E 테스트</td>
      <td><strong>Cypress (v13.16.1)</strong></td>
      <td>브라우저 기반의 End-to-End(E2E) 테스트 수행</td>
    </tr>
  </tbody>
</table>



## ✍️ 컨벤션
**커밋 컨벤션**
- {Tag}/{작업 내용}
```
Feat/input : 비밀번호 숨김 처리
```
- 커밋 규칙
<table>
  <thead>
    <tr>
      <th>Tag Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Feat</td>
      <td>새로운 기능을 추가</td>
    </tr>
    <tr>
      <td>Fix</td>
      <td>버그 수정</td>
    </tr>
    <tr>
      <td>Design</td>
      <td>CSS 등 사용자 UI 디자인 변경</td>
    </tr>
    <tr>
      <td>!BREAKING CHANGE</td>
      <td>커다란 API 변경의 경우</td>
    </tr>
    <tr>
      <td>!HOTFIX</td>
      <td>치명적인 버그 긴급 수정</td>
    </tr>
    <tr>
      <td>Style</td>
      <td>코드 포맷 변경, 세미콜론 누락 등</td>
    </tr>
    <tr>
      <td>Refactor</td>
      <td>프로덕션 코드 리팩토링</td>
    </tr>
    <tr>
      <td>Comment</td>
      <td>주석 추가 및 변경</td>
    </tr>
    <tr>
      <td>Docs</td>
      <td>문서 수정</td>
    </tr>
    <tr>
      <td>Test</td>
      <td>테스트 코드 추가 또는 수정</td>
    </tr>
    <tr>
      <td>Chore</td>
      <td>빌드 업무 수정 및 패키지 관리 업데이트</td>
    </tr>
    <tr>
      <td>Rename</td>
      <td>파일/폴더명 수정</td>
    </tr>
    <tr>
      <td>Remove</td>
      <td>파일/폴더 삭제</td>
    </tr>
  </tbody>
</table>
<br>

**초기 협업 시 주의사항**
- 패키지 매니저는 pnpm을 사용합니다.
  - `npm install -g pnpm`
  - `pnpm install`
- navbar가 존재하는 페이지 구현 시 `app/(nav)` 폴더 하위에 작성합니다.
- navbar가 없는 페이지 구현 시 `app/(fullscreen)` 폴더 하위에 작성합니다.
- 중복 가능성이 있거나 페이지가 너무 길어져서 분리가 필요한 컴포넌트의 경우 분리한 파일은 `components` 폴더의 같은 이름을 가지는 하위 폴더에 생성합니다.
- 만약 화면에 표시하는 것 외의 로직이 길어지면 필요하면 `utils` 폴더에 js파일 작성합니다.
- 아이콘 사용 시 `https://marella.me/material-icons/demo/` 페이지에서 탐색 후 없으면 파일로 대체합니다.
<br>

## 🧑‍🤝‍🧑 팀원 소개
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Kee0304">
        <img src="https://github.com/Kee0304.png" alt="기남석" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/newgamer11">
        <img src="https://github.com/newgamer11.png" alt="김영성" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kimh7537">
        <img src="https://github.com/kimh7537.png" alt="김현우" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bangsk2">
        <img src="https://github.com/bangsk2.png" alt="방성경" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seonmin5">
        <img src="https://github.com/seonmin5.png" alt="오선민" width="150" height="150"/>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hcu55">
        <img src="https://github.com/hcu55.png" alt="홍찬의" width="150" height="150"/>
      </a>
    </td>
  </tr>
   <tr>
    <td align="center">
      <a href="https://github.com/Kee0304">
        <b>기남석</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/newgamer11">
        <b>김영성</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/kimh7537">
        <b>김현우</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bangsk2">
        <b>방성경</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/seonmin5">
        <b>오선민</b>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/hcu55">
        <b>홍찬의</b>
      </a>
    </td>
  </tr>
  <tr>
   <td align="center">총괄 팀장<br/>Frontend 팀장<br/>FullStack 개발</td>
   <td align="center">FullStack 개발 팀원</td>
   <td align="center">Backend 팀장<br/>FullStack 개발</td>
   <td align="center">FullStack 개발 팀원</td>
   <td align="center">PM 팀장<br/>FullStack 개발 팀원</td>
   <td align="center">FullStack 개발 팀원</td>
 </tr>
  <tr>
    <td align="center">
      프론트 프로젝트 세팅 <br>
      프론트 인증/인가 <br>
      프론트 CI/CD <br>
      기타 UI/기능 구현
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      카드 생성 페이지 구현 <br>
      카드 생성 API 연결 <br>
      UUID로 멱등키 생성 <br>
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      내용 입력 <br>
      내용 입력 <br>
      내용 입력
    </td>
    <td align="center">
      MDC 로깅 구현 <br>
      내용 입력 <br>
      내용 입력
    </td>
  </tr>
</table>

<br>

---
[요구사항 정의서.pdf](https://github.com/user-attachments/files/18225291/default.pdf)

[서비스 요구사항 정의서.pdf](https://github.com/user-attachments/files/18225293/default.pdf)

[비즈니스프로세스모델.pdf](https://github.com/user-attachments/files/18225295/default.pdf)

[WBS.pdf](https://github.com/user-attachments/files/18225296/WBS.pdf)

[DB 설계서.pdf](https://github.com/user-attachments/files/18225297/DB.pdf)




## 🔗 관련 문서 링크
- [Quostomize-BE](https://github.com/woorifisa-projects-3rd/Quostomize-BE)
- [Quostomize-admin](https://github.com/woorifisa-projects-3rd/Quostomize-admin)
- [HeadlessUI](https://headlessui.com/)
