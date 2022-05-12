# 추첨 프로그램

링크: https://limeunseop.github.io/raffle

## 사용기술

- React, styled-components
- React Testing Library
- TDD 개발방법론

## 개발 일지

- TDD로 개발하기로 결심하고 개발에 임했다. 처음에 정말 힘들었는데 적응하니까 테스트를 맞추는 재미가 쏠쏠했다. 나름 Mocking 테크닉도 생겼고, 테스팅을 원활히 하기위한 모듈 분리법을 깨닫는 계기가 되었다. 역시 연습 또 연습을 해야 익숙해진다. 연습 없이 처음부터 모든걸 계산하려는 예전 습관을 바꿔가는 내 자신에게 너무나 고맙다.
  - 테스트가 용이하도록 하기위한 모듈분리법 핵심: Router와 같은 앱 전체상태와 관련된 모듈은 앱컴포넌트 혹은 레이아웃컴포넌트 선에서 마치게 할 것. 화면을 담당하는 컴포넌트는 독립된 테스트가 가능하도록 전체상태에 묶이지 않도록 관리하자.(리덕스와 같은 상태관리 라이브러리를 사용하면 해당 리듀서 하나만 의존관계가 생기도록 독립적인 상태여야 할 것)
  - UI 테스트 방법: React UI를 단위테스트 하는 방법은 주로 일단 모두 제작한 후 1. 스냅샷 테스팅을 하는 방법, 2. 특정 액션 수행시 props로 넘어온 콜백이 호출되는지 체크하면 된다. 자세한 기능 테스트는 단위테스트에서 할 필요는 없고, App 컴포넌트를 통합테스트 할 때 수행하면 된다.
