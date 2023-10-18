import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { getLeavesDetail, addCompoffLeave } from "../../services/LeaveService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../layouts/Notification.js'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import {  bindDesignation, bindReportingEmployee } from "../../services/EmployeeService.js";
import "react-datepicker/dist/react-datepicker.css";

export default function AddEditManageLeave(props) {

  const [show, setShow] = useState(true);
  const currentLeaveId = props.leaveId;
  const [compoffLeave, setCompoffLeave] = useState("");
  const [compoffLeaveErr, setCompoffLeaveErr] = useState(false);

  const handleClose = () => setShow(false);
  const { loading, setLoading } = useLoading();
  const [dataLoading, setDataLoading] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const [reportingEmployee, setReportingEmployee] = useState("");
  const [employeeNameErr, setEmployeeNameErr] = useState(false);
  let employeedata = [];
  
  let token = localStorage.getItem('accessToken')
  let repEmployeeId;
  if (token) {
    const cryptoEmail = localStorage.getItem('email')
    repEmployeeId = localStorage.getItem('employeeId')
  }
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
        let employeevalue = [];

        if (currentLeaveId != null && currentLeaveId != 0) {
          await getLeavesDetail(currentLeaveId).then(res => {
          
          });
        }
        await bindReportingEmployeeList();
        const designationListData = employeedata?.find(x => x.employeeId == employeevalue);

        setReportingEmployee({ label: designationListData.reportingEmployee, value: employeevalue })
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
  }, [currentLeaveId])

  async function bindReportingEmployeeList() {
    setLoading(true);
    try {
      await bindReportingEmployee().then(res => {
        setEmployeeList(res)
        employeedata = res;
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function reportingHandler(e) {
    let item = e.value;
    if (item == null || item == "") {
      setEmployeeNameErr(true);
    } else {
      setEmployeeNameErr(false)
    }
    setEmployeeId(item);

    const EmployeeNameData = employeeList?.find(x => x.value === item);
    if (EmployeeNameData) {
      setReportingEmployee(EmployeeNameData);
    }
  }


  function CompoffLeaveHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setCompoffLeaveErr(true)
    } else {
      setCompoffLeaveErr(false)
    }
    setCompoffLeave(item);
  }

  async function SaveHoliday(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';

    let validate = true;

    try {
      if (employeeId == null || employeeId == "") {
        validate = false;
        setEmployeeNameErr(true);
      }
      else {
        setEmployeeNameErr(false);
      }

      if (compoffLeave == null || compoffLeave == "") {
        validate = false;
        setCompoffLeaveErr(true);
      }
      else {
        setCompoffLeaveErr(false);
      }


      await addCompoffLeave(compoffLeave, employeeId,repEmployeeId).then(res => {
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
          {currentLeaveId == null || currentLeaveId == 0 ? <Modal.Title>Add Leave</Modal.Title> : <Modal.Title>Update Leave</Modal.Title>}
        </Modal.Header>
        <Form onSubmit={SaveHoliday}>
          <Modal.Body>
            <Form.Group className='defaultWidth mb-3'>
                <Form.Label className='display-inline search-label mb-1 required'>Employee Name</Form.Label>
                <Select
                  //  value={designationName}
                  //  options={designation.map(({ label, value }) => ({ label: label, value: value }))}
                  options={employeeList.map(({ employeeId, employeeName }) => ({ label: employeeName, value: employeeId }))}
                  onChange={reportingHandler}
                  defaultValue={reportingEmployee}
                  defaultMenuIsOpen={false}
                  id="employeeId">
                </Select>
                {employeeNameErr ? <span style={{ color: 'red' }}>Please select employee name</span> : null}
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label className="mb-1 required">Compoff Leave</Form.Label>
              <Form.Control type="number" autoComplete="off" name="compoffLeave" id="compoffLeave"
                value={compoffLeave} onChange={CompoffLeaveHandler} />{compoffLeaveErr ? <span style={{ color: 'red' }}>Please enter compoff leave</span> : null}
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