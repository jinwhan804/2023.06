// ES6 문법 사용

// 기존에 작업을 할 때는 모듈을 가져와서 작업
// ES6부터는 import가 생김

class LoginBtn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin : false
        }
    }

    render(){
        return (
            <button onClick={
                ()=>{
                    this.setState({isLogin : !this.state.isLogin})
                }
            }>{this.state.isLogin ? 'Logout' : 'Login'}</button>
        )
    }
}

// nodejs에서는 모듈을 외부로 보낼 때 module.exports를 했지만
// react에서는 export로 보낸다.

// 여러개 내보낼 때는 객체로 감싸서 작업
// export {LoginBtn}

// 하나만 내보낼 때는 default 사용
export default LoginBtn