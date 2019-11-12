import React, { Component } from 'react';
import Snake from './Snake';
import Food from './Food';



const getRandomCordinates = () => {
      let min = 1 ;
      let max = 98 ;
      let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
      let y =  Math.floor((Math.random()*(max-min+1)+min)/2)*2;
      
      return [x,y]
  }
  

 const startGame = (props) => {
    window.location.reload();
  } 

const initialState  = {
     speed:200,
     food: getRandomCordinates(),
     direction:'RIGHT',
     snakeDots: [
      [0,0],
      [2,0]
     ],
     scorecard:'NONE',
     myscore:0
}  

class App extends Component {

  
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake,this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate(){
    this.checkBorder();
    this.snakeCollapsed();
    this.snakeEatingFood();
    
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch(e.keyCode){
      case 37:
      this.setState({direction:'LEFT'});
      break;
      case 38:
      this.setState({direction:'TOP'});
      break;
      case 39:
      this.setState({direction:'RIGHT'});
      break;
      case 40:
      this.setState({direction:'DOWN'});
      break;

    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch(this.state.direction){
      case 'RIGHT':
      head = [head[0] + 2,head[1]];
      break;
      case 'LEFT':
      head = [head[0] - 2,head[1]];
      break;
      case 'TOP':
      head = [head[0],head[1] -2 ];
      break;
      case 'DOWN':
      head = [head[0],head[1] + 2];
      break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots:dots
    })

  }

  checkBorder(){
    let border = this.state.snakeDots[this.state.snakeDots.length - 1];
    if(border[0]>100|| border[1]>100 || border[0]< 0 || border[1] < 0){
      this.gameOver();
    }

  }

  gameOver(){
    alert(`Game Over. you scored ${this.state.snakeDots.length}`);
    this.setState(initialState);
  }

  snakeCollapsed(){
    let snake = [...this.state.snakeDots];
    let head  = snake[snake.length - 1];
    let sanketurn = snake[snake.length - 2];
    let i = 0 ;
    
    snake.pop();
    let snakeLenght = snake.length;
    snake.forEach(dots => {
        i = i+1;
        if(snake){
          
        if(dots[0] == head[0] && dots[1] == head[1])
        {
          let j =i+1;
          if(j  != snakeLenght){
          this.gameOver();
        }}}
    })
  }

  snakeEatingFood(){
    let ed = [...this.state.snakeDots];
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food =  this.state.food;
    if(food[0] == head[0] && food[1] == head[1]){
      


      this.enlargeSnake();
      this.increaseSpeed();
    }

  }

  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    


    this.setState({
      snakeDots: newSnake
    })

    this.setState({
        food: getRandomCordinates()
      })
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      })
    }
  }

 

  render() {
      const score = this.state.scorecard;

        return(
            <div className="game-area">
             
                    <Snake snakeDots={this.state.snakeDots} />
                    <Food dot={this.state.food} />
                    
               
            </div>
          
      );
  }
}


export default App;
