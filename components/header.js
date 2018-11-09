import css from '../styles/header.scss'
import LoginBtn from './loginBtn'
import Link from 'next/link';
class Header extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:null
    }
  }
  componentDidUpdate(prevProps){
    if(this.props.user!==prevProps.user){
      this.setState({user:this.props.user})
    }
  }
  render() {
    return (
      <div className={css.header}>
        <div className={css.logo}><Link href="/"><a>Giffer</a></Link></div>
        <LoginBtn user={this.state.user}/>
      </div>
    );
  }
}



export default Header;
