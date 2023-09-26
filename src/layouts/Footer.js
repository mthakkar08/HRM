import React from 'react';
import '../assets/styles/App.css';

export default function Footer() {

  let token = localStorage.getItem('accessToken')

  return (
    !token ? (<></>):
    <>
      <footer className='d-flex flex-wrap justify-content-between align-items-center main-footer'  >
        <div className='col-sm-8 d-flex align-items-center'>
          <span className='text-muted'>©  {new Date().getFullYear()} <a style={{color:'#51438D'}}>HR Manangement </a>, All Rights Reserved.</span>
        </div>  
      </footer>
    </>
  );
}


