import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import css from '../styles/home.scss';
import MobileNav from '../components/mobileNav';
import Header from '../components/header';
class Home extends React.Component {
  constructor(props){
    super(props)
    this.state={
      user: null,
      gifs: [],
      nextGifArr: [],
      chunkCounter: -7,
      two: false,
      scroller:700
    }
  }

getGifs = () => {
    let chunk = {
      chunkCounter:this.state.chunkCounter
    }
    axios.post('/api/getGifs', chunk)
    .then((gifs)=>{
      this.setState({gifs:gifs.data,
                     chunkCounter:-14})

    }).catch(err=>{console.log(err)})
  }
  componentDidMount(){
      axios.get('/api/getUser')
      .then((user)=>{
        this.setState({user:user.data})
      }).catch(err=>{console.log(err)})
  this.getGifs();

    window.addEventListener('scroll', (e)=>{
          //console.log(window.pageYOffset)
        if(window.pageYOffset>this.state.scroller && this.state.two===false){
          let nextChunk = {
            chunkCounter:this.state.chunkCounter
          }
          this.setState({two:true}, ()=>{
            axios.post('/api/getGifs', nextChunk)
            .then(gifs=>{
              let counter = this.state.chunkCounter-=7
              this.setState({nextGifArr:gifs.data,
                             chunkCounter:counter})

            }).catch(err=>{
              console.log(err)
            })
          })
        }
      })
  }

  renderNextGallery=()=>{
    return this.state.nextGifArr.map((gif,ind)=>{
      return(
        <div key={ind} style={{background:`url('${gif.image}')`,
            backgroundSize:'cover',
            backgroundPosition:'center'}}
            className={css.galGifWrap2}>
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
          {this.renderNextGallery()}
        </div>
      )
    }
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
        <Head>
          <title>Giffer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="../static/favicon.png"/>
        </Head>
        <Header user={this.state.user}/>
        <MobileNav />
        {this.renderLanding()}
        <div className={css.nextIconWrap}>
          <img className={css.nextIcon} src="../static/nextJSIcon.png"/>
        </div>
        {this.renderNextGifs()}
      </div>

    )
  }
}
/*Home.getInitialProps = async () =>{
  let chunk = {
    chunkCounter:-7
  }
  let gifs = await axios.post('/api/getGifs', chunk)

  return {}
}*/
export default Home
