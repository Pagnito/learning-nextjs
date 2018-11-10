import axios from "axios";
import MobileNav from '../components/mobileNav';
import Head from 'next/head';
import { withRouter } from "next/router";
import gifshot from "gifshot";
import Header from "../components/header";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name:'',
      fileList: [],
      imgNum: 0,
      errors: {},
      gif: "",
      interval: 0.3,
      duration: 1,
      numberFrames: 10,
      height: 200,
      width: 200,
      gifErrors: {
        interval: "Interval",
        duration: "Duration",
        numberFrames: "Number of Frames",
        height: "Height",
        width: "Width",
        name: 'Name'
      }
    };
    this.fileList = [];
  }
  componentDidMount() {
    axios.get("/api/getUser").then(res => {
      this.setState({ user: res.data });
    });
  }
  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  makeGif = () => {
    if(isNaN(this.state.interval) ||
       isNaN(this.state.duration) ||
       isNaN(this.state.numberFrames) ||
       isNaN(this.state.height) ||
       isNaN(this.state.width)
     ) {
       alert('use numbers son son')
     } else {
       let images = this.state.fileList;
       gifshot.createGIF(
         {
           gifWidth: this.state.width,
           gifHeight: this.state.height,
           images: images,
           interval: this.state.interval,
           numFrames: this.state.numberFrames,
           frameDuration: this.state.duration,
           fontWeight: "normal",
           fontSize: "16px",
           fontFamily: "sans-serif",
           fontColor: "#ffffff",
           textAlign: "center",
           textBaseline: "bottom",
           sampleInterval: 10,
           numWorkers: 2
         },
         obj => {
           if (!obj.error) {
             var image = obj.image;
             this.setState({ gif: image });
           }
         }
       );
     }

  };
  listToBeUploaded = () => {
    return this.state.fileList.map((file, ind) => {
      return <div key={ind}>{file.name}</div>;
    });
  };
  showImages = () => {
    return this.state.fileList.map((file, ind) => {
      return (
        <div className={css.imgWrap} key={ind}>
          <img className={css.img} src={file} />
        </div>
      );
    });
  };
  showGif = () => {
    if (this.state.gif.length > 0) {
      return (
        <div className={css.imgWrap}>
          <img className={css.gif} src={this.state.gif} />
        </div>
      );
    }
  };
  submitGif = () => {
    let errors ={};
    let imgObj = {
      img: this.state.gif,
      name: this.state.name
    };
    if(this.state.gif.length!==0 && this.state.name.length!==0){
      axios.post("/upload", imgObj).then(res => {
        console.log(res);
      });
    } else {
      errors.name = "You must name your gif"
      this.setState({gifErrors: errors})
    }

  };
  onChange = event => {
    let errors = {};
    this.setState({ fileList: [] }, () => {
      this.fileList = [];
      let files = document.getElementById("upBtn").files;
      for (let i = 0; i < files.length; i++) {
        /////
        let reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = e => {
          this.fileList.push(e.target.result);
          //console.log(this.fileList)
          this.setState({
            fileList: this.fileList,
            errors: {}
          });
          if (files[i].size > 1000000) {
            errors.size = "Max Size is 1mb";
            this.setState({
              errors: errors,
              fileList: []
            });
            files.value = "";
            return;
          }
        };
        /////
      }
    });
  };
  render() {
    return (
      <div className='uploader'>
        <Head>
          <title>Giffer</title>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="shortcut icon" href="../static/favicon.png"/>
        </Head>

        <Header user={this.state.user} />
        <MobileNav/>
        <div className='uploadWindow'>
          <form
            className='form'
            action="/upload"
            method="POST"
            encType="multipart/form-data"
          >
            <div className='btns'>
              <label className='customUpBtn'>
                Upload Images
                <input
                  id="upBtn"
                  multiple
                  onChange={this.onChange}
                  className='imgUp'
                  type="file"
                  name="image"
                />
              </label>
              <div>{this.listToBeUploaded()}</div>
              <button
                onClick={this.makeGif}
                className='customUpBtn'
                type="button"
              >
                {this.state.fileList.length > 0 ? "Preview" : "Use Camera"}
              </button>
            </div>

            <div className='gifConfig'>
              <div className='inputHolder'>

                <input

                  onChange={this.onInputChange}
                  className='inputFName'
                  type="text"
                  name="name"
                  placeholder={this.state.gifErrors.name}
                />
            </div>
              <div className='inputHolder'>
                <div className='title'>Interval</div>
                <input
                  value={this.state.interval}
                  onChange={this.onInputChange}
                  className='inputF'
                  type="text"
                  name="interval"
                  placeholder={this.state.gifErrors.interval}
                />
            </div>
            <div className='inputHolder'>
              <div className='title'>Duration</div>
              <input
                value={this.state.duration}
                onChange={this.onInputChange}
                className='inputF'
                type="text"
                name="duration"
                placeholder={this.state.gifErrors.duration}
              />
            </div>
            <div className='inputHolder'>
              <div className='title'>Frames</div>
              <input
                value={this.state.numberFrames}
                onChange={this.onInputChange}
                className='inputF'
                type="text"
                name="numberFrames"
                placeholder={this.state.gifErrors.numberFrames}
              />
            </div>
            <div className='inputHolder'>
              <div className='title'>Height</div>
              <input
                value={this.state.height}
                onChange={this.onInputChange}
                className='inputF'
                type="text"
                name="height"
                placeholder={this.state.gifErrors.height}
              />
            </div>
            <div className='inputHolder'>
              <div className='title'>Width</div>
              <input
                value={this.state.width}
                onChange={this.onInputChange}
                className='inputF'
                type="text"
                name="width"
                placeholder={this.state.gifErrors.width}
              />
            </div>
            </div>
             <div className='createBtnWrap'
                onClick={this.submitGif}
                type="button"
              >
                Upload
            </div>
          </form>

          <div className='preview'>
            <div className='imagesHolder1'>
              {this.showImages()}
              <div className='imageError'>{this.state.errors.size}</div>
            </div>
            <div className='imagesHolder2'>{this.showGif()}</div>
          </div>
        </div>
        <style jsx>
          {`
            body {
              margin:0px !important;
              padding:0px !important;
              overflow-x: hidden;
              background-color: #242628;
            }

            .uploader {
              background-color: #242628;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;

            }
            .uploadWindow {
              width:80%;
              min-height:70vh;
              padding-top: 50px;
              display:flex;
              align-content: flex-start;
            }
            .form {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              box-sizing: border-box;
              border: 2px solid #242628;
              background-color: rgba(152,95,199,.6);
              width:40%;
            }
            .btns {
              display:flex;
              justify-content: space-around;
              width:100%;

            }
            .gifConfig {
              display: flex;
              justify-content: space-between;
              flex-direction: column;
              align-items:center;

            }
            .inputHolder {
                display: flex;
                width:80%;
                font-family: 'comfortaa';
                align-items: center;
                font-size: 20px;
                color:white;
                padding:15px;
            }
            .title{
              width:70%;
            }
            .inputF {
              color:#f47742;
              border: none;
              padding:5px;
              padding-left: 10px;
              border-left: 2px solid white;
              height: 30px;
              font-size: 20px;
              width:30%;
              margin-left: 15px;
              font-family: 'comfortaa';
              outline:none;
              background-color: transparent;
            }
            .inputFName {
              color:#f47742;
              border: none;
              padding:5px;
              padding-left: 10px;
              border-bottom: 2px solid white;
              height: 30px;
              font-size: 20px;
              width:80%;
              margin-left: 15px;
              font-family: 'comfortaa';
              outline:none;
              background-color: transparent;
            }
            .inputFName::placeholder {
              color:#EF7742;
            }
            .createBtnWrap {
              display: flex;
              background-color: #EF7742;
              font-size: 40px;
              font-family: 'comfortaa';
              padding: 10px;
              cursor: pointer;
              color:white;
              justify-content: center;
            }
            .createBtnWrap:hover {
              background-color: #51155b;
              color:#b2ef39;
            }
            .preview {
              display:flex;
              width:60%;
              background-color: rgba(0,0,0,.9);
              flex-direction: column;
            }
            .imagesHolder1 {
              border: 2px solid #242628;
              display:flex;
              padding-top: 5px;
              padding-bottom: 5px;
              background-color: rgba(14,159,178,.6);
              min-height: 80px;
              overflow-x: scroll;


            }
            .imageError {
              color: red;
              font-size: 40px;
              margin-left: 20px;
              margin-top: 20px;
              font-family: 'Comfortaa'
            }
            .img {
              width:80px;
              height:80px;
              margin-left: 5px;
            }
            .imagesHolder2 {
              border: 2px solid #242628;
              display:flex;
              height:100%;
              padding: 10px;
              justify-content: center;
              align-items: center;


            }
            .gif {
              height: 320px;
              width: 320px;
            }
            .imgWrap {
              margin:5px;

            }
            .imgUp {
              display:none;
            }
            .customUpBtn {
                font-family: 'comfortaa';
                border: none;
                padding:15px;
                color: #EF7742;
                background: transparent;
                display: inline-block;
                cursor: pointer;
                font-size: 20px;
                outline: none;
            }
            .customUpBtn:hover {
              color:lightgreen;
            }
            @media(max-width:960px){
              .uploadWindow{
                flex-direction: column-reverse;
                }
                .form {

                  width:100% !important;
                }
                .imagesHolder1 {
                  min-height: 80px;
                  margin-top: 0px
                }
                .preview {
                  width:100% !important;
                  margin-top: 30px;
                }
                .imagesHolder2 {
                  padding: 0px;
                  min-height: 200px;
                  width:96% !important;
                }

              .uploader {
                padding-bottom: 40px;
              }
            }
            @media(max-width:600px){
              .gif {
                height: 200px !important;
                width:200px !important;
              }
              .imgWrap {
                margin: 0px !important;
              }
            }

          `}
        </style>
      </div>
    );
  }
}

export default withRouter(Uploader);
