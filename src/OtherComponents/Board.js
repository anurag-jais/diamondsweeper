import React, { Component } from "react";
import './Board.css';
import { Button, Modal, Form, Input } from 'antd';
import { Icon } from 'antd';


let arr = [
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?'],
    ['?', '?', '?', '?', '?', '?', '?', '?']
];


let color = [
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue'],
    ['lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue', 'lightblue']
];

class Board extends Component {
    state = {
        board: arr,
        //board: Array(8).fill(Array(8).fill('?')),
        randomArray: [],
        distanceArray: [],
        colorboard: color,
        savex: -1,
        savey: -1,
        counter: 56,
        visible: false
    }


    // let randomArray=[];
    componentDidMount() {
        let randomArray = this.state.randomArray;
        randomArray.length = 0;
        for (let i = 0; i < 8; i++) {
            let position = Math.ceil(Math.random() * 61);
            if (randomArray.includes(position)) {
                console.log('prevent repeating numbers');
                continue;
            }
            randomArray.push(position);

        }
        if (randomArray.length !== 8) {
            let length = 8 - randomArray.length;
            for (let index = 1; index <= length; index++) {
                randomArray.push(61 + index);
            }
        }
        console.log("random array generated");
        console.log(randomArray);
        this.setState({
            randomArray: randomArray
        });
    }

    showModal = () => {
        this.setState({ visible: true });
      };
    
      handleCancel = () => {
        this.setState({ visible: false });
      };
    
      handleCreate = () => {
       // const { form } = this.formRef.props;
        this.props.form.validateFields((err, values) => {
          if (err) {
            return;
          }
          console.log('Received values of form: ', values);
          let listPlayer=[];
            let x = window.localStorage.getItem("player");
            if(x){
                listPlayer = JSON.parse(x);
            }
            listPlayer.push(values);
            window.localStorage.setItem("player",JSON.stringify(listPlayer));
          this.props.form.resetFields();
          this.setState({ visible: false });
          this.props.showScore(this.state.counter);
        });
      };
    
      saveFormRef = formRef => {
        this.formRef = formRef;
      };
    


    flipButton = (button, x, y) => {
        let count = this.state.counter;
        let board = this.state.board;
        let colorboard = this.state.colorboard;
        console.log(this.state.savex);
        console.log(this.state.savey);
        if (this.state.savex != -1 && this.state.savey != -1 && board[parseInt(this.state.savex)][parseInt(this.state.savey)] != '$') {
            console.log(button);
            board[parseInt(this.state.savex)][parseInt(this.state.savey)] = '';
            colorboard[this.state.savex][this.state.savey] = 'white';
            this.setState({
                board: board,
                colorboard: colorboard
            });
        }
        let randomArray = this.state.randomArray;
        console.log(board);
        console.log(x, y);
        let value = x * 8 + y;
        let X = [];
        let Y = [];
        let distanceArray = [];
        let minValue = 128;
        let minX = -1;
        let minY = -1;
        for (let i = 0; i < randomArray.length; i++) {
            X[i] = Math.floor(this.state.randomArray[i] / 8);
            Y[i] = Math.floor(this.state.randomArray[i] % 8);
        }
        if (randomArray.length > 0 && randomArray.includes(value)) {
            board[x][y] = '$';
            colorboard[x][y] = 'lightgreen';
            let index = -1;
            for (let i = 0; i < randomArray.length; i++) {
                if (randomArray[i] === (8 * x + y)) {
                    index = i;
                    break;
                }
            }
            randomArray.splice(index, 1);
            // if(randomArray.length === 0){
            //     //this.props.showScore(this.state.counter);
            //     this.showModal();
            // }
            this.setState({
                board: board,
                randomArray: randomArray,
                colorboard: colorboard
            });
            console.log(board);
        }
        else if (randomArray.length === 0) {
            console.log("Random Array Exhausted");
            this.showModal();
            //this.props.showScore(this.state.counter);
        }
        else {
            console.log("distanceArray");
            for (let i = 0; i < randomArray.length; i++) {
                distanceArray[i] = Math.sqrt(Math.pow(Math.abs(X[i] - x), 2) +
                    (Math.pow(Math.abs(Y[i] - y), 2)));
                console.log(distanceArray[i]);
                if (distanceArray[i] < minValue) {
                    minValue = distanceArray[i];
                    minX = X[i];
                    minY = Y[i];
                }
            }

            console.log(minX, minY);

            let diffX = x - minX;
            let diffY = y - minY;
            if (diffX > 0 && diffY === 0) {
                board[x][y] = 'Up';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffX < 0 && diffY === 0) {
                board[x][y] = 'Down';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffY > 0 && diffX === 0) {
                board[x][y] = '<--';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffY < 0 && diffX === 0) {
                board[x][y] = '-->';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffX > 0 && diffY > 0) {
                board[x][y] = '<--';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffX < 0 && diffY < 0) {
                board[x][y] = '-->';
                colorboard[x][y] = 'white';
                count--;
            }
            else if (diffX > 0 && diffY < 0) {
                board[x][y] = 'Up';
                colorboard[x][y] = 'white';
                count--;
            }
            else {
                board[x][y] = 'Down';
                colorboard[x][y] = 'white';
                count--;
            }
            this.setState({
                board: board,
                colorboard: colorboard,
                savex: x,
                savey: y,
                counter: count,

            });
        }
    }
    render() {
        const ButtonArray = this.state.board.map((buttonX, x) => {
            //{ console.log(buttonX) }
            return buttonX.map((button, y) => {
                if (button === '$')
                    button = <Icon type="sketch" style={{ fontSize: '50px' }} />
                else if (button === '-->')
                    button = <Icon type="arrow-right" style={{ fontSize: '40px' }} />
                else if (button === '<--')
                    button = <Icon type="arrow-left" style={{ fontSize: '40px' }} />
                else if (button === 'Up')
                    button = <Icon type="arrow-up" style={{ fontSize: '40px' }} />
                else if (button === 'Down')
                    button = <Icon type="arrow-down" style={{ fontSize: '40px' }} />
                return (

                    <div className="buttonarray">
                        <button style={{ backgroundColor: this.state.colorboard[x][y] }} className='button'

                            onClick={() => { button === '?' ? this.flipButton(button, x, y) : null }}>

                            {button}

                        </button>
                    </div>
                );
            })
        })
        const {   form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div>
                <div className="board">
                    {ButtonArray}
                </div>

                
                <Modal
                    visible={this.state.visible}
                    title="GAME FINISHED"
                    okText="Create"
                    onCancel={this.handleCancel}
                    onOk={this.handleCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Your Name: ">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Name is Required !' }],
                            })(<Input type="text" />)}
                        </Form.Item>
                        <Form.Item label="Your Score:">
                            {getFieldDecorator('score', {initialValue : this.state.counter} )(<Input type="text"  />)}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }

}
export default Form.create()(Board);

