import Link from 'next/link';
import axios from 'axios';
import css from '../styles/home.scss'
import Header from '../components/header';
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user: null,
      gifs: [],
      nextGifArr: [],
      chunkCounter: -7,
      two: false
    }
  }
  componentDidMount(){
      axios.get('/api/getUser')
      .then((user)=>{
        this.setState({user:user.data})
      }).catch(err=>{console.log(err)})
      let chunk = {
        chunkCounter:this.state.chunkCounter
      }
      axios.post('/api/getGifs', chunk)
      .then((gifs)=>{
        this.setState({gifs:gifs.data,
                       chunkCounter:-14})

      })
      .catch(err=>{console.log(err)})
      window.addEventListener('scroll', (e)=>{
          //console.log(window.pageYOffset)
        if(window.pageYOffset>600 && this.state.two===false){
          let nextChunk = {
            chunkCounter:this.state.chunkCounter
          }
          this.setState({two:true})
          axios.post('/api/getGifs', nextChunk)
          .then(gifs=>{
            let counter = this.state.chunkCounter-=7
            this.setState({nextGifArr:gifs.data,
                           chunkCounter:counter})

          })
        }
      })
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
  renderGallery2=()=>{
    return this.state.nextGifArr.map((gif,ind)=>{
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
  renderNextGifs = () => {

    if(this.state.nextGifArr.length===0){
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
        <div className={css.gallery2}>
          {this.renderGallery2()}
        </div>
      )
    }
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
        {this.renderNextGifs()}
      </div>

    )
  }
}
export default Home
