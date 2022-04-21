# ChilLin

### Update

-  2022-04-12

   -  _Detail.js_

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 추가

      -  영화 상세페이지 페이지 가로 크기에따라 font size 및 전체적인 레이아웃 조정

-  2022-04-14

   -  _Detail.js_

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 수정

         -  스크롤 이벤트는 스크롤 내릴수록 배경의 opacity값이 서서히 증가하면서 어두워지게 구현

            (재랜더링이 너무 많아 페이지 성능에 영향을 끼칠 우려가 있어 Sensitivity 변수로 이벤트 랜더링 발생 빈도 조절)

         -  영화 상세페이지 하단 버튼 생성 및 스크롤 이벤트 추가

-  2022-04-16

   -  _Details.js_

      -  출연진 사진 Horizontal Scroll 구현

   -  _Detail.js_

      -  영화 상세페이지 DETAILS 버튼 및 COMMENTS 버튼 업데이트

      -  hover, onClick 시 색 변화

      -  onClick 시 component 등장 애니메이션 구현

         -  Detail 페이지 로딩될 때 DETAILS 및 COMMENTS의 opacity 값을 defulat 0 으로 설정함으로써 visibility의 hidden과 비슷하게 구현 후, DETAILS 및 COMMENTS onClick 시 opacity 값에 변화를 주어(1) 애니메이션과 함께 보이도록 구현

         -  페이지 스크롤 일정 범위 이상으로 올라가게 되면 opacity 값에 변화를 주어(0) component가 보이지 않도록 구현

-  2022-04-18

   -  _Details.js_

      -  출연진 목록 Card 형태로 배역 및 실명 추가

   -  _Scroller.js_

      -  prev 버튼과 next 버튼 추가

         -  ScrollerWrapper의 Element.scrollLeft 값에 따라 prev 및 next의 opacity 속성에 변화를 주어 애니메이션 구현(임시)

         -  ScrollerWrapper 의 Width 길이를 받아오는 과정에서 _useRef()_ HOOK을 사용

         -  ScrollerWrapper의 Element.scrollWidth와 스크롤을 오른쪽 끝으로 이동하였을 때 Element.scrollLeft의 값이 같을 것으로 예상했으나 모든 상세 페이지에서 920씩 편차가 생겨 이를 조정하여 next 버튼 애니메이션 구현

         -  prev 버튼 및 next 버튼 onClick 시 Scroller 의 위치 전환을 위해 _Element.scrollTo()_ 함수 사용, _behavior: "smooth"_ 옵션까지 주어 부드럽게 애니메이션 처리

-  2022-04-19 - 2022-04-20

   -  _Details.js_

      -  페이지 하단 배치를 위해 display:grid 로 구조 수정(4:1 비율로 작성하였고, 추후 right 부분에 컴포넌트 구현 예정 )

   -  _Trailer.js_

      -  DETAILS 최초 진입 후 페이지 스크롤 특정 위치 시 자동 재생 구현

      -  DETAILS 컴포넌트 가려질 때(페이지 상단 스크롤, COMMENTS onClick) 재생 정지 구현

      -  DETAILS 컴포넌트 두 번째 이상 진입 시 부터 자동재생 x

   -  _Loading.js_

      -  홈 페이지 로딩 애니메이션 구현

      -  sessionstorage 활용하여 홈 페이지 접근 시 최초 한 번만 보이도록 구현

      -  _setTimeout()_ 함수 사용하여 각각 애니메이션에 딜레이 주어 구현하였고 _setLoading()_ 함수를 prop 으로 가져와 모든 애니메이션 종료 시 loading상태를 false로 설정해 홈 화면이 보이도록 구현
