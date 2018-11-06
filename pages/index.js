import Link from 'next/link';
import css from '../styles/home.scss'
const Home = () => {
  return (
    <div className={css.home}>SSR Magician
      <Link href="/about"><button type="button">About</button></Link>
    </div>


  )
}
export default Home
