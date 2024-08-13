import React from 'react';
import loading from './loading.gif';

const Spinner = () => {
  return (
    <div className='position-absolute top-50 start-50 translate-middle'>
      <img src={loading} alt="Loading" style={{ width: '80px', height: '80px' }} />
    </div>
  );
};

export default Spinner;
