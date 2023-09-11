import React from 'react';
import '../assets/styles/App.css';

export default function Footer() {

  let token = localStorage.getItem('accessToken')

  return (
    !token ? (<></>):
    <>
      <footer className='d-flex flex-wrap justify-content-between align-items-center main-footer'  >
        <div className='col-md-4 d-flex align-items-center'>
          <span className='text-muted'>©  {new Date().getFullYear()}  HR Manangement, All Rights Reserved.</span>
        </div>
      </footer>
    </>
  );
}
