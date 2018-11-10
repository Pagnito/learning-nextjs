import Link from 'next/link';

export class MobileNav extends React.Component {
  constructor(props){
    super(props)
    this.state={
      navVisible: false
    }
  }
  hideNav = () => {
    let nav = document.getElementById('mobNavBg');
    nav.style.display = 'none';
  }
  render() {
    return (
      <div id="mobNavBg" className='mobNavBg'>
        <div onClick={this.hideNav} className='mobNav'>
          <div className='btnHolder'>
            <Link href="/uploader"><a className='mobBtn'>Create Gif</a></Link>
            <Link href="/account"><a className='mobBtn'>My Gifs</a></Link>
            <Link href="/"><a className='mobBtn'>Home</a></Link>
          </div>
        </div>
        <style jsx>{`
          .mobNavBg {
            display:none;
            position: fixed;
            background-color: rgba(0,0,0,.7);
            width:100%;
            height:100vh;
            top:0px;
            justify-content: center;
            align-items: center;
            z-index: 110;

          }
          .mobNav {
            height:90vh;
            width:90%;
            background-color: #e3e5e8;
            display:flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

          }
          .btnHolder {
            height:60%;
            width:100%;
            display: flex;
            flex-direction: column;
            align-items: center;

          }
          .mobBtn {
            color:#854FF0;
            font-size: 30px;
            font-family: 'quicksand';
            margin-top: 20px;
          }
        `}</style>
      </div>
    );
  }
}

export default MobileNav;
