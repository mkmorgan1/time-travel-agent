import React from 'react';
import ReactDOM from 'react-dom';
import './client/game.js';
import './styles.css'
import SpaceBar from './client/SpaceBar.jsx';
import ArrowKeys from './client/ArrowKeys.jsx';

const Index = () => {
  let mobile = 'Mobile Version';
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobile = 'Mobile Version'
  }
  React.useEffect(() => {
    function handleResize() {
      console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
  }, [])
  return (
    <div>
      <div className='title'>
        <div className='device'>TIME TRAVEL AGENT {mobile}</div>
        <div className='desktop'>TIME TRAVEL AGENT </div>
      </div>
      <div id="game">
        <script src="./client/game.js"></script>
      </div>
      <div className='button-box'>
        <SpaceBar/>
        <ArrowKeys/>
      </div>
    </div>
  );

};

ReactDOM.render(<Index />, document.getElementById('app'));