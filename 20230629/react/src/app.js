// ES6 문법

// 컴포넌트를 내보낼 때 객체 형태로 내보냈다면 동일하게 객체 형태로 받아와야 한다.
// import {LoginBtn} from './components/loginBtn';

// default로 사용해서 내보낸 경우에는 이름이 동일하지 않아도 된다. 즉 현재 파일에서 사용하고자 하는 이름으로 변경해서 작성해도 된다.
import Login from './components/loginBtn';

// 루트 요소를 가상 DOM으로 생성
// 설정
const root = ReactDom.createRoot(document.querySelector('#root'));
root.render(<Login/>);