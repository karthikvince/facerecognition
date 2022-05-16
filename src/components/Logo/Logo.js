import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'

const Logo = () => {
  return (
    // <Tilt>
    //   <div className='tilt'>
    //     <h1>React Parallax Tilt 👀</h1>
    //   </div>
    // </Tilt>
    <div className='ma4'>
    <Tilt className="Tilt shadow-2"  style={{ height: 100, width: 100 }} >
      <div className="pa3">
        <img alt='logo' src={brain}/>
      </div>
    </Tilt>
  </div>
  );
};

export default Logo;
