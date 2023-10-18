import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getLeavePolicyDetail, addLeavePolicy } from "../../services/LeavePolicyService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../layouts/Notification.js'
import "react-datepicker/dist/react-datepicker.css";

export default function AddEditLeavePolicy(props) {
  const [show, setShow] = useState(true);
  const currentLeavePolicyId = props.leavePolicyId;
  const [startFrom, setStartFrom] = useState("");
  const [endTo, setEndTo] = useState("");
  const [leaveCount, setLeaveCount] = useState("");
  const [startFromErr, setStartFromErr] = useState(false);
  const [endToErr, setEndToErr] = useState(false);
  const [leaveCountErr, setLeaveCountErr] = useState(false);
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
        if (currentLeavePolicyId != null && currentLeavePolicyId != 0) {
          await getLeavePolicyDetail(currentLeavePolicyId).then(res => {
            setStartFrom(res.startFrom)
            setEndTo(res.endTo)
            setLeaveCount(res.leaveCount)
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
  }, [currentLeavePolicyId])

  function StartFromHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setStartFromErr(true)
    } else {
      setStartFromErr(false)
    }
    setStartFrom(item);
  }

  function EndToHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setEndToErr(true)
    } else {
      setEndToErr(false)
    }
    setEndTo(item);
  }

  function leaveCountHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setLeaveCountErr(true)
    } else {
      setLeaveCountErr(false)
    }
    setLeaveCount(item);
  }

  async function SaveHoliday(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';
    let validate = true;

    try {
      if (startFrom == undefined || startFrom.trim() == null || startFrom.trim() == "") {
        validate = false;
        setStartFromErr(true);
      }
      else {
        setStartFromErr(false);
      }

      if (endTo == undefined || endTo.trim() == null || endTo.trim() == "") {
        validate = false;
        setEndToErr(true);
      }
      else {
        setEndToErr(false);
      }

      if (leaveCount == undefined || leaveCount.trim() == null || leaveCount.trim() == "") {
        validate = false;
        setLeaveCountErr(true);
      }
      else {
        setLeaveCountErr(false);
      }

      await addLeavePolicy(currentLeavePolicyId, leaveCount, startFrom, endTo).then(res => {
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
          {currentLeavePolicyId == null || currentLeavePolicyId == 0 ? <Modal.Title>Add Leave Policy</Modal.Title> : <Modal.Title>Update Leave Policy</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveHoliday}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 required">Start From</Form.Label>
              <Form.Control type="date" autoComplete="off" name="startFrom" id="startFrom"
                value={startFrom?.replace("/", "-")?.substring(0, 10)} onChange={StartFromHandler} />{startFromErr ? <span style={{ color: 'red' }}>Please enter start from</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 required">End To</Form.Label>
              <Form.Control type="date" autoComplete="off" name="endTo" id="endTo"
                value={endTo?.replace("/", "-")?.substring(0, 10)} onChange={EndToHandler} />{endToErr ? <span style={{ color: 'red' }}>Please enter end to</span> : null}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="mb-1 required">Leave Count</Form.Label>
              <Form.Control type="text" autoComplete="off" name="leaveCount" id="leaveCount"
                value={leaveCount} onChange={leaveCountHandler} />
              {leaveCountErr ? <span style={{ color: 'red' }}>Please enter leave count</span> : null}
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