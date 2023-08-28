import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getEmployeeDetail, addEmployees } from "../../services/EmployeeServices.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../components/Notification.js'

export default function AddEditEmployee(props) {

  const [show, setShow] = useState(true);
  const currentemployeeId = props.employeeId;
  const [employeeName, setEmployeeName] = useState("");
  const [dob, setDob] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() => {
    if (!show) {
      props.onDataSave(false);
    }
  }, [show])

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setDataLoading(true);
        if (currentemployeeId != null && currentemployeeId != 0) {
          await getEmployeeDetail(currentemployeeId).then(res => {
            setEmployeeName(res.employeeName)
            setDob(res.dob)
          });
        }
      }
      catch (error) {

      }
      finally {
        setTimeout(() => {
          setDataLoading(false);  
          setLoading(false);      
        }, 1200);
      }
    })();
  }, [currentemployeeId])

  function EmployeeHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEmployeeNameErr(true)
    } else {
      setEmployeeNameErr(false)
    }
    setEmployeeName(item);
  }

  async function SaveEmployee(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (employeeName == undefined || employeeName.trim() == null || employeeName.trim() == "") {
        validate = false;
        setEmployeeNameErr(true);
        return;
      }
      else {
        setEmployeeNameErr(false);
      }

      await addEmployees(currentemployeeId, employeeName, dob).then(res => {
        debugger;
        console.log(res.employeeName)
        if(res!= null){
         // message = res.toString();
         message = "saved successfully";
        }
      });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      setLoading(false);
      if (validate) {
        if (message == "SUCCESS") {
          props.onDataSave(true, message);
        }
        else {
          Notification(message, 'ERROR')
        }
      }
    }
  }

  return (
    <>
      <Modal
        show={show && !dataLoading}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="main-class"
      >
        <Modal.Header closeButton>
          {currentemployeeId == null || currentemployeeId == 0 ? <Modal.Title>Add Employee</Modal.Title> : <Modal.Title>Update Employee</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveEmployee}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1">Employee Name</Form.Label>
              <Form.Control type="text" autoComplete="off" name="employeeName" id="employeeName"
                value={employeeName}  onChange={EmployeeHandler} />{employeeNameErr ? <span style={{ color: 'red' }}>Please enter Employee Name</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1">dob</Form.Label>
              <Form.Control type="dob" autoComplete="off" name="dob" id="dob" 
                as="textarea" value={dob} onChange={(e) => { setDob(e.target.value) }}
               
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button className='btn btn-dft mr-2' onClick={handleClose}> Close</Button>
            <Button className='btn btn-primary' type="submit">Save</Button> <ToastContainer />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}