import css from '../styles/login.scss';
import Link from 'next/link';
class Login extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      user: null
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.user!== this.props.user){
      this.setState({user:this.props.user})
    }
  }
  renderIflogged=()=>{
    if(this.state.user==null){
      return (
        <div className={css.spinner}>
          <div className={css.rect1}></div>
          <div className={css.rect2}></div>
          <div className={css.rect3}></div>
          <div className={css.rect4}></div>
          <div className={css.rect5}></div>
        </div>
      )
    }
    else if(this.state.user && this.props.user.userName){
      return (
        <div className={css.navBtns}>
          <Link href="/uploader"><div className={css.navBtn}>Create Gif</div></Link>
          <Link href="/account"><div className={css.navBtn}>My Gifs</div></Link>
          <a href="/api/logout"><div className={css.navBtn}>Log Out</div></a>
        </div>
      )
    } else {
      return (
        <div>
          <div className={css.navBtnsOut}>
            <Link href="/uploader"><div className={css.navBtnOut}>Create Gif</div></Link>
          </div>
          <div className={css.login}>
            <a href="/auth/facebook">Login with Facebook</a>
          </div>
       </div>
      )
    }
  }
  render() {
    return (
      <div className={css.loginStuff}>
        {this.renderIflogged()}
      </div>
    );
  }
}

export default Login;
