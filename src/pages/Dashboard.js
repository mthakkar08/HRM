import React, { useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { BsFileEarmarkText } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { ReactSession } from 'react-client-session';
import { decryptData } from '../services/EncryptDecrypt';


export default function Dashboard() {

  const navigate = useNavigate();

  
  let email;
  // const email = ReactSession.get("email");

  useEffect(() => {
    const authtoken = localStorage.getItem('accessToken')
    // console.log(token)
    if (!authtoken) {
      navigate('/login');
    }
    else{
      const cryptoEmail =ReactSession.get("email");
      email = decryptData(cryptoEmail);
    }
  }, []);

  return (
    <>
    <p>email : {email}</p>
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}>
              <div class="panel-body">
                <div class="row">
                  <div class="col-lg-6">
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>1</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>2</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>3</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>4</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>5</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>6</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>7</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>8</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>9</span></a>
                    <a href="/Finance" class="min-width-100 min-height-100 btn btn-primary btn-float" style={{ marginRight: '10px' }}><i class="icon-bookmark4 icon-2x" style={{ display: 'flow-root', paddingBottom: '5px' }}></i><span>10</span></a>
                  </div>
                </div>
              </div>
            </Navbar.Brand>


          </Navbar >
        </ListGroup.Item>
      </ListGroup>




    </>
  )
}


