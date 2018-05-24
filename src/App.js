import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import Slider from 'react-rangeslider';
var morsify = require('morsify');

const pump = require('pump');
const CharStream = require('morsea/char-stream');
const TextEncoder = require('morsea/text-encoder');
const AudioEncoder = require('morsea/audio-encoder');

const audioEncoder = AudioEncoder.create();



class App extends Component {
  constructor(props, context) {
   super(props, context)
   this.state = {
     volume: 0,
     value: "",
   }

   this.handleChange = this.handleChange.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
 }

 handleOnChange = (value) => {
   this.setState({
     volume: value
   })
 }

 handleChange(event) {
   this.setState({value: event.target.value});
 }

 handleSubmit(event) {

   var encoded = morsify.encode(this.state.value);

   console.log(encoded);
   event.preventDefault();
   this.setState({
     encoded
   })
 }

  render() {
    console.log(this.state.volume);
    console.log(this.state.value);


    let { volume } = this.state

    if(this.state.encoded){
      var audio = morsify.audio(this.state.encoded);
      audio.play();
      setTimeout(
        function(){
          return audio.stop();
        }, 6000
      );
    }




    return (
      <div className="App">
        {this.state.volume}
      <Slider
        className="slider"
        step={20}
        tooltip={false}
        value={volume}
        orientation="vertical"
        onChange={this.handleOnChange}
      />

      <form onSubmit={this.handleSubmit}>
       <label>
         Name:
         <input type="text" value={this.state.value} onChange={this.handleChange} />
       </label>
       <input type="submit" value="Submit" />
     </form>
     {this.state.encoded}

      </div>
    );
  }
}

export default App;