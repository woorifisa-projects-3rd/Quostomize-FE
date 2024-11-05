# 커스터마이징 서비스 프론트엔드 레포지토리
## 초기 협업 시 주의사항
- 패키지 매니저는 pnpm을 사용하도록 한다.
  - `npm install -g pnpm` 
- navbar가 존재하는 페이지 구현 시 `app/(nav)` 폴더 하위에 작성
- navbar사 없는 페이지 구현 시 `app/(fullscreen)` 폴더 하위에 작성
- 중복 가능성이 있거나 페이지가 너무 길어져서 분리가 필요한 컴포넌트의 경우 분리한 파일은 `components` 폴더의 같은 이름을 가지는 하위 폴더에 생성
- 만약 화면에 표시하는 것 외의 로직이 길어지면 필요하면 `utils` 폴더에 js파일 작성
- 아이콘 사용 시 `https://marella.me/material-icons/demo/` 페이지에서 탐색 후 없으면 파일로 대체