import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';

const app = new Clarifai.App({
  apiKey: 'b9f1d2a6641041f18de332eab1e21dd7'
});

const particlesOptions = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 1000,
      }
    },
  },
}

class App extends Component {

  constructor() {
    super(); // Need this to use "this"
    this.state = {
      input: '', // User input
      imageURL: '',
      box: '',
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        dateJoined: new Date()
      }
    }
  }

  loadUserValues = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        dateJoined: data.dateJoined
      }
    })
  }

  // The idea is to figure out your state variables, and then write methods that handle
  // any change to these state variables

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  drawDetectionArea = (box) => {
    this.setState({
      box: box
    });
  }
  // Arrow functions avoid the error of misreferencing with "this"
  // If you use curly brace syntax, usage of "this" could end up 
  // referring to the specific DOM element that triggered this method call
  // This event parameter gets triggered by the DOM element that wants to update the state
  // We are listening for any calls made down in the child components
  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onButtonSubmit = () => {
    this.setState({
      imageURL: this.state.input
    });
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then((response) => {
        this.drawDetectionArea(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onRouteChange = (route) => {

    if (route === 'signout') {
      this.setState({
        isSignedIn: false
      });
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      });
    }
    this.setState({
      route: route
    });
  }

  // Remember to use "this.<prop>"!
  render() {
    const { isSignedIn, route, imageURL, box } = this.state;
    return (
      <div>
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
          ? <div>

            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceDetection box={box} imageURL={imageURL} />
          </div> : (
            route === 'signin'
              ? <SignIn loadUserValues={this.loadUserValues} onRouteChange={this.onRouteChange} />
              : <Register loadUserValues={this.loadUserValues} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}

export default App;
