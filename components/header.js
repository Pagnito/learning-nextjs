import css from '../styles/header.scss'
import LoginBtn from './loginBtn'
import Link from 'next/link';
class Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:null,
      navVisible: false
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.user!==prevProps.user){
      this.setState({user:this.props.user})
    }
  }
  showNav = () => {
    let nav = document.getElementById('mobNavBg');
    nav.style.display = 'flex';
  }
  
  render() {
    return (
      <div className={css.header}>
        <div className={css.logo}><Link href="/"><a>Giffer</a></Link></div>
        <LoginBtn user={this.state.user}/>
        <img id="mobNavBtn" onClick={this.showNav} className={css.MobNavBtn} src='../static/heartNavIcon.png' />
      </div>
    );
  }
}



export default Header;
