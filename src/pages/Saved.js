

import React, { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';

export default function Saved() {

  const navigate = useNavigate();
  const [json, setJson] = useState({
    name: 'bhoomi',
    age: 42,
    address: {
      street: '123 Main St.',
      city: 'Boston',
      state: 'MA'
    }
  });

  // This function updates the "json" state by changing the "name" property
  const updateName = () => {
    setJson({
      ...json, // copy the current properties of "json"
      name: 'patel' // update the "name" property
    });
  };
  useEffect(() => {

    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login');
    }
  }, []);


  return (
    <>
    <div className="title">
      Messages
    </div>
     <div>
     <p>Name: {json.name}</p>
     <button onClick={updateName}>Update Name</button>
   </div>
   </>
  )
}


