import React from 'react';
import '../assets/styles/App.css';

export default function Footer() {
  return (
      <>
        <footer className='d-flex flex-wrap justify-content-between align-items-center'>
          <div className='col-md-4 d-flex align-items-center'>
          <span className='text-muted'>©  {new Date().getFullYear()}  S&P Global, All Rights Reserved.</span>
          </div>
        </footer>
      </>
  );
}
