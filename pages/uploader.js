import css from "../styles/uploader.scss";
import axios from "axios";
import { withRouter } from "next/router";
import gifshot from "gifshot";
import Header from "../components/header";

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fileList: [],
      imgNum: 0,
      errors: {},
      gif: "",
      interval: 0.3,
      duration: 1,
      numberFrames: 10,
      height: 400,
      width: 400,
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
      <div className={css.uploader}>
        <Header user={this.state.user} />
        <div className={css.uploadWindow}>
          <form
            className={css.form}
            action="/upload"
            method="POST"
            encType="multipart/form-data"
          >
            <div className={css.btns}>
              <label className={css.customUpBtn}>
                Upload Images
                <input
                  id="upBtn"
                  multiple
                  onChange={this.onChange}
                  className={css.imgUp}
                  type="file"
                  name="image"
                />
              </label>
              <div>{this.listToBeUploaded()}</div>
              <button
                onClick={this.makeGif}
                className={css.customUpBtn}
                type="button"
              >
                {this.state.fileList.length > 0 ? "Preview" : "Camera"}
              </button>
            </div>

            <div className={css.gifConfig}>
              <div className={css.inputHolder}>

                <input

                  onChange={this.onInputChange}
                  className={css.inputFName}
                  type="text"
                  name="name"
                  placeholder={this.state.gifErrors.name}
                />
            </div>
              <div className={css.inputHolder}>
                <div className={css.title}>Interval</div>
                <input
                  value={this.state.interval}
                  onChange={this.onInputChange}
                  className={css.inputF}
                  type="text"
                  name="interval"
                  placeholder={this.state.gifErrors.interval}
                />
            </div>
            <div className={css.inputHolder}>
              <div className={css.title}>Duration</div>
              <input
                value={this.state.duration}
                onChange={this.onInputChange}
                className={css.inputF}
                type="text"
                name="duration"
                placeholder={this.state.gifErrors.duration}
              />
            </div>
            <div className={css.inputHolder}>
              <div className={css.title}>Frames</div>
              <input
                value={this.state.numberFrames}
                onChange={this.onInputChange}
                className={css.inputF}
                type="text"
                name="numberFrames"
                placeholder={this.state.gifErrors.numberFrames}
              />
            </div>
            <div className={css.inputHolder}>
              <div className={css.title}>Height</div>
              <input
                value={this.state.height}
                onChange={this.onInputChange}
                className={css.inputF}
                type="text"
                name="height"
                placeholder={this.state.gifErrors.height}
              />
            </div>
            <div className={css.inputHolder}>
              <div className={css.title}>Width</div>
              <input
                value={this.state.width}
                onChange={this.onInputChange}
                className={css.inputF}
                type="text"
                name="width"
                placeholder={this.state.gifErrors.width}
              />
            </div>
            </div>
             <div className={css.createBtnWrap}
                onClick={this.submitGif}
                type="button"
              >
                Create
            </div>
          </form>

          <div className={css.preview}>
            <div className={css.imagesHolder1}>
              {this.showImages()}
              <div className={css.imageError}>{this.state.errors.size}</div>
            </div>
            <div className={css.imagesHolder2}>{this.showGif()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Uploader);
