import React, { Component } from 'react';
import Board from './OtherComponents/Board';
import './App.css';
//import {Button} from 'antd';
import { Modal, Button } from 'antd';

class App extends Component {
  state = {
    isGamefinish : false,
    score: 0,
    
    listPlayer: [],
    isleaderBoardClicked: false,
    visible: false
    
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };





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
    this.showModal();
    this.setState({
      isleaderBoardClicked: !isleaderBoardClicked,
      listPlayer:listPlayer
    });
    
  } 
  render() {
    console.log(this.state.isleaderBoardClicked);
    console.log(this.state.listPlayer);
    
    return (
      <div className="App">
        <h3>Diamond Sweeper</h3>
        <h4>Your Score:</h4>
        {this.state.isGamefinish === true ? this.state.score : null }
        <br></br>
        <Button onClick={this.startGame}>Start Game</Button>
        <Button onClick= {this.MakeLeaderBoard}>LeaderBoard</Button>
        {this.state.isStartGameClicked === true ? <Board showScore = {this.showScore}/> : null}
        {
        this.state.isleaderBoardClicked === true ? 
        
        <Modal
        title="LeaderBoard"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        {this.state.listPlayer.map(player =>{
         return <table>
                  <tr><td>{player.name}</td><td></td><td></td><td>{player.score}</td></tr>
                </table> 
         })}
      </Modal>
         : null }
       {/* {this.state.isleaderBoardClicked === true ? {displayplayerlist}: null } */}
      </div>
    );
  }
}

export default App;
