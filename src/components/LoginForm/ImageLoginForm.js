import React from 'react';
import './LoginForm.css'

const ImageLoginForm =({onInputChange,onClickDetect})=>{
     return (
         <div>
            <p className='f3'>
            {'This Magic Brain will detect faces in your pictures. Git it a try.'}
            </p>
          <div className='center'>
            <div className='form shadow-5 br3 pa4 center'>
               <input className='f4 pa2 w-70' type='text' onChange={onInputChange}/>
               <button className='w-30 center grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onClickDetect}>Detect</button>
            </div>
          </div>
         </div>
     );
}

export default ImageLoginForm;