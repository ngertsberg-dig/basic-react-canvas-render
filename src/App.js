import React from 'react';
import logo from './logo.svg';
import './App.css';
import Ship from './classes/Ship';

const KEY = {
  LEFT:  37,
  RIGHT: 39,
  UP: 38,
  A: 65,
  D: 68,
  W: 87,
  SPACE: 32
};

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      screen:{
        width: window.innerWidth,
        height: window.innerHeight,
        ratio: 1
      },
      context: null,
      keys:{
        left: 0,
        right: 0,
        up: 0,
        down: 0,
        space: 0
      },
      inGame: false
    }
    this.ship = [];
  }
  componentDidMount(){
    document.addEventListener("keydown",this.getKeyDown.bind(this,true));
    document.addEventListener("keyup",this.getKeyDown.bind(this,false));
    const context = this.refs.canvas.getContext('2d');
    this.setState({ context });
    this.startGame();
    requestAnimationFrame(() => {this.update()});
  }
  getKeyDown(value,key){
    let keys = this.state.keys;
    const keyCode = key.keyCode;
    if(keyCode === KEY.LEFT || keyCode === KEY.A ) keys.left = value;

    this.setState({ keys })

  }
  update(){
    const context = this.state.context;
    const keys = this.state.keys;
    const ship = this.ship[0];
    
    context.save();
    context.scale(this.state.screen.ratio, this.state.screen.ratio);
    
    // Motion trail
    context.fillStyle = '#000';
    context.globalAlpha = 1;
    context.fillRect(0, 0, this.state.screen.width, this.state.screen.height);
    context.globalAlpha = 1;
    context.restore();

    ship.render(this.state);
    requestAnimationFrame(() => {this.update()});
  }
  startGame(){
    this.setState({ inGame: true });
    let ship = new Ship({
      position:{
        x: this.state.screen.width / 2,
        y: this.state.screen.height / 2
      }
    })
    this.ship.push(ship)
  }
  render(){
    return (
      <div className="App">
        <canvas ref = "canvas" 
          width = {this.state.screen.width}
          height = {this.state.screen.height}
        />
      </div>
    );
  }
}

export default App;
