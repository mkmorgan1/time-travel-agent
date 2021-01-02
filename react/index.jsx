import React from 'react';
import ReactDOM from 'react-dom';
import './client/Master.js'
import './client/Level.js';
import './client/Level1.js';
import './client/Level2.js';
import './client/game.js';
import './styles.css'


const Index = () => {
  return (
    <div>
      <div>TIME TRAVEL AGENT</div>
      <div id="game">
        <script src="./client/Master.js"></script>
        <script src="./client/Level.js"></script>
        <script src="./client/Level1.js"></script>
        <script src="./client/Level2.js"></script>
        <script src="./client/game.js"></script>
      </div>
    </div>
  );

};

ReactDOM.render(<Index />, document.getElementById('app'));