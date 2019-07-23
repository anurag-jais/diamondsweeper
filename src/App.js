import React, { Component } from 'react';
import Board from './OtherComponents/Board';
import './App.css';
import {Button} from 'antd';

class App extends Component {
  state = {
    isGamefinish : false,
    score: 0,
    
    listPlayer: [],
    isleaderBoardClicked: false
    
  }
  showScore = (counter) =>{
    this.setState({
      isGamefinish : true,
      score: counter,
      isStartGameClicked : false,
      isreset: false
    });
  }

  startGame = ()=>{
    let clicked = this.state.isStartGameClicked;
    //alert("I'm running");
    this.setState({
      isStartGameClicked : true 
    });
  }

  MakeLeaderBoard = ()=>{
    function compare(a,b){
      if(parseInt(a.score)<parseInt(b.score))
        return 1;
      if(parseInt(a.score)>parseInt(b.score))
        return -1;
      else
        return 0;
    }
    let isleaderBoardClicked = this.state.isleaderBoardClicked;
    let listPlayer=[];
    let x = window.localStorage.getItem("player");
    if(x){
        listPlayer = JSON.parse(x);
    }
    console.log(listPlayer);
    listPlayer.sort( compare );
    listPlayer.splice(10);
    this.setState({
      isleaderBoardClicked: !isleaderBoardClicked,
      listPlayer:listPlayer
    });
    
  } 
  render() {
    console.log(this.state.isleaderBoardClicked);
    console.log(this.state.listPlayer);
    // let displayplayerlist = null;
    // if(this.state.listPlayer && this.state.listPlayer.length>0){
    //   displayplayerlist = this.state.listPlayer.map(player =>{
    //     return(
    //       <div>{player.name} {player.score}</div>
    //     )
    //   }); 
    // }
    return (
      <div className="App">
        <h3>Diamond Sweeper</h3>
        <h4>Your Score:</h4>
        {this.state.isGamefinish === true ? this.state.score : null }
        <br></br>
        <Button onClick={this.startGame}>Start Game</Button>
        <Button onClick= {this.MakeLeaderBoard}>LeaderBoard</Button>
        {this.state.isStartGameClicked === true ? <Board showScore = {this.showScore}/> : null}
        {this.state.isleaderBoardClicked === true ?          
        this.state.listPlayer.map(player =>{
        return (
          
          <div>{player.name} {player.score}</div> 
        )
      }) : null }
       {/* {this.state.isleaderBoardClicked === true ? {displayplayerlist}: null } */}
      </div>
    );
  }
}

export default App;
