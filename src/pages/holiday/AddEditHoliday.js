import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getHolidayDetail, addHoliday } from "../../services/HolidayService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../components/Notification.js'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddEditHoliday(props) {

  const [show, setShow] = useState(true);
  const currentHolidayId = props.holidayId;
  const [holidayName, setHolidayName] = useState("");
  const [holidayDate, setHolidayDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(1);

  const [holidayNameErr, setHolidayNameErr] = useState(false);
  const [holidayDateErr, setHolidayDateErr] = useState(false);
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
        if (currentHolidayId != null && currentHolidayId != 0) {
          await getHolidayDetail(currentHolidayId).then(res => {
            debugger;
            setHolidayName(res.holidayName)
            setHolidayDate(res.holidayDate)
            setDescription(res.description)
            setStatus(res.status)
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
  }, [currentHolidayId])

  function HolidayHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
        setHolidayNameErr(true)
    } else {
        setHolidayNameErr(false)
    }
    setHolidayName(item);
  }

  function holidayDateHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
        setHolidayDateErr(true)
    } else {
    setHolidayDateErr(false)
    }
    setHolidayDate(item);
  }

  async function SaveHoliday(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';

    let validate = true;

    try {
      if (holidayName == undefined || holidayName.trim() == null || holidayName.trim() == "") {
        validate = false;
        setHolidayNameErr(true);
      }
      else {
        setHolidayNameErr(false);
      }

      if (holidayDate == undefined || holidayDate == null || holidayDate == "") {
        validate = false;
        setHolidayDateErr(true);
      }
      else {
        setHolidayDateErr(false);
      }
    
      await addHoliday(currentHolidayId, holidayName, holidayDate, description, status).then(res => {
        message = res.toString();
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
          {currentHolidayId == null || currentHolidayId == 0 ? <Modal.Title>Add Holiday</Modal.Title> : <Modal.Title>Update Holiday</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveHoliday}>
          <Modal.Body>
        
              <Form.Group className="mb-3">
                <Form.Label className="mb-1 required">Holiday Name</Form.Label>
                <Form.Control type="text" autoComplete="off" name="holidayName" id="holidayName"
                  value={holidayName} onChange={HolidayHandler} />{holidayNameErr ? <span style={{ color: 'red' }}>Please enter holiday name</span> : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="mb-1 required">Holiday Date</Form.Label>
                <Form.Control type="date" autoComplete="off" name="holidayDate" id="holidayDate"
                  value={holidayDate?.replace("/","-")?.substring(0,10)} onChange={holidayDateHandler} />{holidayDateErr ? <span style={{ color: 'red' }} dateFormat="yyyy/MM/DD">Please select holiday date</span> : null}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="mb-1">Description</Form.Label>
                <Form.Control type="description" autoComplete="off" name="description" id="description"
                  as="textarea" value={description} onChange={(e) => { setDescription(e.target.value) }}
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