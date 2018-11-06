import Link from 'next/link';
import axios from 'axios';
import css from '../styles/home.scss'
class Home extends React.Component {
  componentDidMount(){
    axios('/api/pikachu/five').then(res=>{
      console.log(res.data);
    })
  }
  render(){
    return (
      <div className={css.home}>SSR Magician
        <Link href="/about"><button type="button">About</button></Link>
      </div>

    )
  }
}
export default Home
