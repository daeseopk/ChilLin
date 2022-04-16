# ChilLin

### Update

-  2022-04-12

   -  Detail.js

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 추가

      -  영화 상세페이지 페이지 가로 크기에따라 font size 및 전체적인 레이아웃 조정

-  2022-04-14

   -  Detail.js

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 수정

         -  스크롤 이벤트는 스크롤 내릴수록 배경의 opacity값이 서서히 증가하면서 어두워지게 구현

            (재랜더링이 너무 많아 페이지 성능에 영향을 끼칠 우려가 있어 Sensitivity 변수로 이벤트 랜더링 발생 빈도 조절)

         -  영화 상세페이지 하단 버튼 생성 및 스크롤 이벤트 추가

-  2022-04-16

   -  Details.js

      -  출연진 사진 Horizontal Scroll 구현

   -  영화 상세페이지 DETAILS 버튼 및 COMMENTS 버튼 업데이트

      -  hover, onClick 시 색 변화

      -  onClick 시 component 등장 애니메이션 구현
         -  Detail 페이지 로딩될 때 opacity 값을 defulat 0 으로 설정함으로써 visibility의 hidden과 비슷하게 구현 후, DETAILS onClick 시 opacity 값에 변화를 주어(1) 애니메이션과 함께 보이도록 구현함
         -  페이지 스크롤 일정 범위 이상으로 올라가게 되면 opacity 값에 변화를 주어(0) component가 보이지 않도록 구현함
