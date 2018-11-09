import Link from 'next/link';
import axios from 'axios';
import css from '../styles/home.scss'
import Header from '../components/header';
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user: null,
      gifs: []
    }
  }
  componentDidMount(){
      axios.get('/api/getUser')
      .then((user)=>{
        this.setState({user:user.data})
      }).catch(err=>{console.log(err)}),
      axios.get('/api/getGifs')
      .then((gifs)=>{
        let objArr = []
        gifs.data.forEach(gif=>{
          objArr.push(JSON.parse(gif))
        })
        this.setState({gifs:objArr})

      })
      .catch(err=>{console.log(err)})
  }
  renderGallery=()=>{
    return this.state.gifs.map((gif,ind)=>{
      return(
        <div key={ind} style={{background:`url('${gif.image}')`,
            backgroundSize:'cover',
            backgroundPosition:'center'}}
            className={css.galGifWrap}>
          {/*<a href={`../static/gifs/${gif.name}.json`} download> */}
          {/*<img className={css.galImg} src={gif.image} />*/}
        </div>
      )
    })
  }
  renderLanding = () => {

    if(this.state.gifs.length===0){
      return (
        <div className={css.spinner1}>
          <div className={css.rect1}></div>
          <div className={css.rect2}></div>
          <div className={css.rect3}></div>
          <div className={css.rect4}></div>
          <div className={css.rect5}></div>
        </div>
      )
    } else {
      return (
        <div className={css.gallery}>
          {this.renderGallery()}
        </div>
      )
    }
  }
  render(){
    return (
      <div className={css.home}>
        <Header user={this.state.user}/>
        {this.renderLanding()}
        <div className={css.nextIconWrap}>
          <img className={css.nextIcon} src="../static/nextJSIcon.png"/>
        </div>
      </div>

    )
  }
}
export default Home
