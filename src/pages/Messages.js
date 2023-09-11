import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Messages() {

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login');
    }
  }, []);


  return (
    <div className="title">
      Messages
    </div>
  )
}
