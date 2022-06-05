# ChilLin

### Update

-  2022/04/12

   -  _Detail.js_

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 추가

      -  영화 상세페이지 페이지 가로 크기에따라 font size 및 전체적인 레이아웃 조정

-  2022/04/14

   -  _Detail.js_

      -  영화 상세페이지 linear gradient 효과 및 스크롤 이벤트 수정

         -  스크롤 이벤트는 스크롤 내릴수록 배경의 opacity값이 서서히 증가하면서 어두워지게 구현

            (재랜더링이 너무 많아 페이지 성능에 영향을 끼칠 우려가 있어 Sensitivity 변수로 이벤트 랜더링 발생 빈도 조절)

         -  영화 상세페이지 하단 버튼 생성 및 스크롤 이벤트 추가

-  2022/04/16

   -  _Details.js_

      -  출연진 사진 Horizontal Scroll 구현

   -  _Detail.js_

      -  영화 상세페이지 DETAILS 버튼 및 COMMENTS 버튼 업데이트

      -  hover, onClick 시 색 변화

      -  onClick 시 component 등장 애니메이션 구현

         -  Detail 페이지 로딩될 때 DETAILS 및 COMMENTS의 opacity 값을 defulat 0 으로 설정함으로써 visibility의 hidden과 비슷하게 구현 후, DETAILS 및 COMMENTS onClick 시 opacity 값에 변화를 주어(1) 애니메이션과 함께 보이도록 구현

         -  페이지 스크롤 일정 범위 이상으로 올라가게 되면 opacity 값에 변화를 주어(0) component가 보이지 않도록 구현

-  2022/04/18

   -  _Details.js_

      -  출연진 목록 Card 형태로 배역 및 실명 추가

   -  _Scroller.js_

      -  prev 버튼과 next 버튼 추가

         -  ScrollerWrapper의 Element.scrollLeft 값에 따라 prev 및 next의 opacity 속성에 변화를 주어 애니메이션 구현(임시)

         -  ScrollerWrapper 의 Width 길이를 받아오는 과정에서 _useRef()_ HOOK을 사용

         -  ScrollerWrapper의 Element.scrollWidth와 스크롤을 오른쪽 끝으로 이동하였을 때 Element.scrollLeft의 값이 같을 것으로 예상했으나 모든 상세 페이지에서 920씩 편차가 생겨 이를 조정하여 next 버튼 애니메이션 구현

         -  prev 버튼 및 next 버튼 onClick 시 Scroller 의 위치 전환을 위해 _Element.scrollTo()_ 함수 사용, _behavior: "smooth"_ 옵션까지 주어 부드럽게 애니메이션 처리

-  2022/04/19 - 2022/04/20

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

-  2022/04/22

   -  _InputComments.js_

      -  Comment 입력창 구현

      -  현재 로그인 중인 사용자 정보 _currenUser_ prop으로 전달 받아 프로필 사진 노출

      -  _onSubmit_ 시 _textarea_, _rating_, _like_count_(default:0), _unlike_count_(default:0), _date_, _user_ firebase 서버로 _put_

         -  _put_ 하기 전 이미 등록되어 있는 댓글 갯수 불러와(_axios.get_) 새로 등록하는 댓글의 key값 지정

   -  _ShowComments.js_

      -  firebase 서버에 현재 영화 id로 등록되어 있는 comments 정보 불러와 _map()_ 함수로 돌며 화면에 comments 표시

      -  _InputComments.js_ 에서 새로운 Comments 등록 시 _ShowComments.js_ 의
         _useEffect()_ 안에서 _Comments_ 의 변화가 생길 때마다 _getComments_ 함수 실행해서 자동으로 재 랜더링 구현

         -  첫 번째 댓글 작성 시에는 정상적으로 재 랜더링되지 않음 (issue)

      -  Comments 정보 서버에서 불러와 화면에 표시 후 웹 콘솔창 확인 시 _Rating_ 컴포넌트에서 끊임없이 경고 발생 (issue)

      -  현재 로그인상태 : true 인 경우만 구현했기 때문에 로그인하지 않은 상태도 구현해야함

      -  Comments 이름 옆 날짜 정보는 yyyy.mm.dd/hh:mm 으로 간략히 표현

         -  추후 댓글 등록 시간과 현재 시간 비교하여 표현 방식 바꿀 예정
