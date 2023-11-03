import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { addEditRole, getRoleList } from "../../services/RoleService.js";
import { useLoading } from '../../LoadingContext.js';
import { Notification } from '../../layouts/Notification.js'
import Select from 'react-select';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function AddEditRole(props) {

  const [show, setShow] = useState(true);
  const currentRoleId = props.roleId;
  const [roleName, setRoleName] = useState("");
  const [roleNameErr, setRoleNameErr] = useState(false);
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
        if (currentRoleId != null && currentRoleId != 0) {
          await getRoleList(currentRoleId).then(res => {
            setRoleName(res.RoleName)
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
  }, [currentRoleId])

  function RoleHandler(e) {
    let item = e.target.value;
    if (item == null || item == "") {
      setRoleNameErr(true)
    } else {
      setRoleNameErr(false)
    }
    setRoleName(item);
  }

  async function SaveRole(e) {
    e.preventDefault();
    setLoading(true);
    let message = '';

    let validate = true;

    try {
      if (roleName == undefined || roleName.trim() == null || roleName.trim() == "") {
        validate = false;
        setRoleNameErr(true);
      }
      else {
        setRoleNameErr(false);
      }

      await addEditRole(roleName).then(res => {
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
          <Modal.Title>Add Role</Modal.Title>
        </Modal.Header>
        <Form onSubmit={SaveRole}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label className="mb-1 required">Role Name</Form.Label>
              <Form.Control type="text" autoComplete="off" name="roleName" id="roleName"
                value={roleName} onChange={RoleHandler} />{roleNameErr ? <span style={{ color: 'red' }}>Please enter role name</span> : null}
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