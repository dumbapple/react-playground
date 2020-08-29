import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'b9f1d2a6641041f18de332eab1e21dd7'
 });


class App extends Component {

  constructor() {
    super(); // Need this to use "this"
    this.state = {
      input: '' // User input
    }
  }
  // The idea is to figure out your state variables, and then write methods that handle
  // any change to these state variables

  // Arrow functions avoid the error of misreferencing with "this"
  // If you use curly brace syntax, usage of "this" could end up 
  // referring to the specific DOM element that triggered this method call
  // This event parameter gets triggered by the DOM element that wants to update the state
  //    We are listening for any calls made down in the child components
  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    console.log('click');

    app.models
    .predict(
      Clarifai.GENERAL_MODEL, 
      "https://image.shutterstock.com/image-photo/close-portrait-young-smiling-handsome-260nw-1180874596.jpg")
    .then((response) => {
        console.log(response);
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
        {/*
        <FaceRecognition />} */}
      </div>
    );
  }
}

export default App;
