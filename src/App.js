import React ,{Component}from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation.js';
import FaceImage from './components/FaceImage/FaceImage';
import Rank from './components/Rank/Rank.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo'
import ImageLoginForm from './components/LoginForm/ImageLoginForm'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css';
import 'tachyons';

const params = {
  // fpsLimit: 30,
  interactivity: {
    events: {
      // onClick: {
      //   enable: false,
      //   mode: "push",
      // },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    // modes: {
    //   push: {
    //     quantity: 4,
    //   },
    //   repulse: {
    //     distance: 150,
    //     duration: 0.8,
    //   },
    // },
  },
  particles: {
    links: {
      color: "#ffffff",
      distance: 100,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    // collisions: {
    //   enable: true,
    // },
    move: {
      direction: "none",
      enable: true,
      // outModes: {
      //   default: "bounce",
      // },
      // random: false,
      // speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 1100,
      },
      value: 50,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
}

const app = new Clarifai.App({
  apiKey: 'your api key'
 })

const particlesInit = async (main) => {
  await loadFull(main);
};

class App extends Component{
  constructor(){
  super();
  this.state = {
    input : '',
    URL : '',
    box : '',
    route : 'signin',
    isSignedIn : false,
    user : {
      id : '',
      email : '',
      name : '',
      entries : '',
      joined : ''
    }
  }

  }

  resetState = () =>{
    this.setState({URL: '',box: '', input: '', route:'signin', isSignedIn : false });
  }
 
  Get_bounding_box =(response) =>{
    const box = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('image');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      bottom_row: height - (box.bottom_row * height),
      left_col: box.left_col * width,
      right_col: width - (box.right_col * width),
      top_row: box.top_row *height
    }
 }

  FixFaceBox = (data) => {
    this.setState({box : data});
  }

  onInputChange =(event)=>{
    this.setState({input : event.target.value})
  }
  
  onClickDetect = () =>{
    this.setState({URL : this.state.input})
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => { 
        this.FixFaceBox(this.Get_bounding_box(response))
        if(response){
          fetch('http://localhost:3000/image',
          {
            method : 'put',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
              id : this.state.user.id
            })
          })
          .then (response => response.json())
          .then (data => {
              this.setState(Object.assign(this.state.user,{entries: data}))
          })
        }
      });
  }

  onRouteChange = (changeRoute) =>{
    if (changeRoute === 'signin'){
      this.setState({isSignedIn : false})
    } else if (changeRoute === 'home') {
      this.setState({isSignedIn : true})
    }
    this.setState({route : changeRoute})
  }
  
  loadUser = (data) => {
    this.setState({user : {
      id : data.id,
      email : data.email,
      name : data.name,
      entries : data.entries,
      joined : data.joined
    }})
  }

  render (){
  return (
    <div className='app'>
         <Particles
      id="tsparticles"
      className='particles'
      init={particlesInit}
      options={params}
      />
      <Navigation onRouteChange={this.onRouteChange} clearState={this.resetState} isSignedIn={this.state.isSignedIn}/>
      {
        this.state.route === 'home' 
        ? 
        <div>
        <Logo/>
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLoginForm onInputChange={this.onInputChange} onClickDetect={this.onClickDetect}/>
        <FaceImage imageURL = {this.state.URL} box= {this.state.box}/>
        </div>
        :
        (
          this.state.route === 'signin' 
          ? <SignIn loadUser ={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser ={this.loadUser} onRouteChange = {this.onRouteChange}/>
        ) 
      }
    </div>
  );
  }
}



export default App;
