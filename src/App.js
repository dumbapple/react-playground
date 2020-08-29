import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';
import FaceDetection from './components/FaceDetection/FaceDetection';


const app = new Clarifai.App({
  apiKey: 'b9f1d2a6641041f18de332eab1e21dd7'
 });


class App extends Component {

  constructor() {
    super(); // Need this to use "this"
    this.state = {
      input: '', // User input
      imageURL: '',
      box: ''
    }
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
  //    We are listening for any calls made down in the child components
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

  // Remember to use "this.<prop>"!
  render() {
    return (
      <div>
        <Navigation />
        <Logo />
        <Rank />
        
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        
        <FaceDetection box={this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
