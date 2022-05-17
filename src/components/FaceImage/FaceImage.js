import React from 'react';
import './FaceImage.css';
const FaceImage =({imageURL , box})=>{
     return (
         <div className='center'>
         <div className='absolute mt2' >
             <img id ='image' src={imageURL} alt='' width='500px' height='auto' />
             <div className='bounding_box' style = {{top : box.top_row , bottom : box.bottom_row, left : box.left_col, right : box.right_col }}></div>
         </div>
         </div>
     );
}

export default FaceImage;