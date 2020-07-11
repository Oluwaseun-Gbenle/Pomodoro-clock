import React, { Component } from 'react';
import './pomodoro.css';

class Controls extends React.Component { 
      
      render () {
    return(
     <div id="control-3">
        <button id="start_stop" onClick={this.props.startCountDown} >Start<i className="fa fa-play"></i>/Stop<i className="fa fa-stop"></i></button>
          <button onClick={this.props.reset} id="reset">Reset<i className="fa fa-refresh"></i></button>
        </div>
    )
      }
      
    }
    
    class Timer extends React.Component {
      
      render () {
         let min = Math.floor(
          (this.props.minutes / 60)
        );
         let sec = this.props.minutes % 60;
        let time = "" + (min >= 10 ? min : "0" + min) + ":" + (sec >= 10 ? sec : "0" + sec);
        
      let warning = this.props.minutes < 60? {color: '#8b0000'} : {color : '#010c37'};
        return(
          <div id="timer">
        
    <div  id="timer-label" >
      {this.props.mode}
      </div>
      
    <div style={warning} id="time-left" >
     {time}
      </div>
            </div>
       )
      }
    }
    
    
    class Scale extends React.Component { 
      
      render() {
       return(
         <div id="top">
          <div id="session-container">
           
               <p id="session-label">
      Session Length
      </p>
           
        <div  id="control-1">
        <button onClick={this.props.sessionIncrement} id="session-increment">
         <p className="sign"> + </p>
      </button>
          
      <p id="session-length"className="figure">{this.props.sessionCounter}</p>
          
     <button  onClick={this.props.sessionDecrement} id="session-decrement">
         <p className="sign"> - </p>
      </button>
        </div>
         
         </div>
         
         
       <div id="break-container">
      
    <p id="break-label">
      Break Length
      </p>  
       
        <div  id="control-2">
        
     <button onClick={this.props.breakIncrement} id="break-increment">
        <p className="sign"> + </p>
      </button>
      
      <p  id="break-length"  className="figure">{this.props.breakCounter}</p>
      
     <button  onClick={this.props.breakDecrement} id="break-decrement">
       <p className="sign"> - </p>
        </button>
        
      </div>  
         
      </div>
           
           
           </div>
       ) 
      }
    }
      
      
     class App extends React.Component {
     constructor(props)  {
       super(props);
     this.state = {
         start:false,
         sessionCounter: 25,
         breakCounter: 5,
         minutes: 1500,
         mode: 'Session',
       intervalId: ""
       }
       
       this.reset = this.reset.bind(this);
       this.startCountDown = this.startCountDown.bind(this);
       this.timerDisplay = this.timerDisplay.bind(this);
       this.sessionIncrement = this.sessionIncrement.bind(this);
       this.breakIncrement = this.breakIncrement.bind(this);
        this.sessionDecrement = this.sessionDecrement.bind(this);
        this.breakDecrement = this.breakDecrement.bind(this);
     }
      sessionIncrement () {
        let add = this.state.sessionCounter + 1
          if(this.state.mode === 'Session') {
            this.setState({
           minutes: add * 60
        });
          }
         if(this.state.sessionCounter < 60){
         this.setState({
       sessionCounter: 
           this.state.sessionCounter + 1 
        });
         }
      }
     
       sessionDecrement () {
          let minus = this.state.sessionCounter - 1;
          if(this.state.mode === 'Session') {
            this.setState({
     minutes: minus * 60  
        }); 
          }
          if(this.state.sessionCounter > 1){
          this.setState({
     sessionCounter:
      this.state.sessionCounter - 1 
        });
      }
       }
       
       breakIncrement () {
          let add = this.state.breakCounter + 1;
          if(this.state.mode === 'Break') {
            this.setState({
      minutes: add * 60
        });
          }
         if(this.state.breakCounter < 30){
          this.setState({
      breakCounter: this.state.breakCounter + 1
        });
      }
       }
       
      breakDecrement () {
         let minus = this.state.breakCounter + 1;
          if(this.state.mode === 'Break') {
             this.setState({
     minutes: minus  * 60 
        });
          }
         if(this.state.breakCounter > 1){
         this.setState({
     breakCounter: this.state.breakCounter - 1
        });
      } 
      
      } 
       timerDisplay () {  
     this.setState({
          minutes: this.state.minutes-1
        });
    
    }
    
       startCountDown () {
           
         if(this.state.start === false){
          let intervalId = setInterval(this.timerDisplay, 1000);
            this.setState({
              intervalId: intervalId,
              start: true
            })
        }else {
          clearInterval(this.state.intervalId);
          this.setState({
            start: false
          })
          }
          
    
       }
       
       
       componentDidUpdate(prevProps) {
         if (this.state.minutes === 0 && this.state.mode ==='Session') {
           this.playAudio();
           this.setState({
           mode: 'Break',
           minutes: this.state.breakCounter * 60
           });
         } else if (this.state.minutes === 0 && this.state.mode ==='Break') {
            this.playAudio();
    this.setState({
           mode: 'Session',
           minutes: this.state.sessionCounter * 60
           });
         }
       }
        playAudio () {
        document.getElementById("beep").play();
      }
       stopAudio () {
        let aud = document.getElementById("beep");
        aud.pause(); 
        aud.currentTime = 0; 
      }
    reset() {
          clearInterval(this.state.intervalId);
        this.stopAudio();
         this.setState({
           sessionCounter: 25,
           minutes: 1500 ,
           mode: 'Session',
           start:false,
           intervalId:""
         });
        
       }
       
       
       
      render() {
       return(
       <div id="outer-container">
          
           <p id="title"> Pomodoro Clock</p>
           
           <div id="inner-container">
             
           <Scale sessionIncrement={this.sessionIncrement} 
             sessionDecrement={this.sessionDecrement}
             breakIncrement=
             {this.breakIncrement}
             breakDecrement=
             {this.breakDecrement}
             sessionCounter={this.state.sessionCounter}
             breakCounter={this.state.breakCounter}
             />  
           
          <Timer
            mode={this.state.mode}
           minutes={this.state.minutes}
           onChange={this.state.onChange}
            />
               
            <Controls
              startCountDown={this.startCountDown}
              reset={this.reset}
              />
             
             
          <audio id="beep">
              <source src="https://res.cloudinary.com/dnruzhfx4/video/upload/v1537892874/sounds/KatchiDooWappi.wav" type="audio/wav" />
            </audio>
          
             
           </div>
           </div>
       ) 
      }
    }


export default App;