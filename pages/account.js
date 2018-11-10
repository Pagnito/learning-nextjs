import css from '../styles/account.scss';
import Header from '../components/header';
import MobileNav from '../components/mobileNav';
import axios from 'axios';
import Head from 'next/head';
class Account extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user:null,
      myGifs:null
    }
  }
  componentDidMount(){
    axios.get('/api/getUser').then(res=>{
      this.setState({user:res.data})
    })
    axios.get('/api/getMyGifs').then(res=>{
      this.setState({myGifs:res.data})
    }).catch(err=>{console.log(err)})
  }
  renderGallery=()=>{
    if(this.state.myGifs!==null){
      return this.state.myGifs.map((gif,ind)=>{
        return (
          <div
            className={css.accountGif}
            key={ind}
            style={{background:`url(${gif.image})`, backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>

          </div>
        )
      })
    } else {
      return (
        <div className={css.spinner1}>
          <div className={css.rect1}></div>
          <div className={css.rect2}></div>
          <div className={css.rect3}></div>
          <div className={css.rect4}></div>
          <div className={css.rect5}></div>
        </div>
      )
    }

  }
  renderAccountInfo = () => {
    if(this.state.user!==null){
      return (
        <div className={css.accountInfo}>
          <img className={css.accPic} src={this.state.user.avatar} />
          <div className={css.userName}>{this.state.user.userName}</div>
        </div>
      )
    } else {
      <div className={css.spinner1}>
        <div className={css.rect1}></div>
        <div className={css.rect2}></div>
        <div className={css.rect3}></div>
        <div className={css.rect4}></div>
        <div className={css.rect5}></div>
      </div>
    }
  }
  render() {
    return (
      <div className={css.account}>
        <Head>
          <title>Giffer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="../static/favicon.png"/>
        </Head>
        <Header user={this.state.user}/>
        <MobileNav/>
        <div className={css.contentHolder}>
          {this.renderAccountInfo()}
          <div className={css.myGallery}>
            {this.renderGallery()}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Account;
