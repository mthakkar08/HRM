import '../assets/styles/App.css';
import Header from './Header';
import Footer from './Footer';
import SideBar from "../components/SideBar.js";
import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from '../pages/Dashboard';
import FileManager from "../pages/FileManager";
import FuelType from "../pages/fuelType/FuelType";

import EmployeeProfile from '../pages/employeeProfile/EmployeeProfile'; 
import EmployeePolicy from '../pages/employeePolicy/EmployeePolicy';
import ManageEmployee from '../pages/employee/ManageEmployee';

import Employee from '../pages/employee/Employee';
import Holiday from '../pages/holiday/Holiday';
import MyLeave from '../pages/myLeave/MyLeave';
import LeavePolicy from '../pages/leavePolicy/LeavePolicy';
import ManageLeave from '../pages/manageLeave/ManageLeave';
import ManageRoleRights from '../pages/manageRoleRights/ManageRoleRights';
import AddEditRoleRights from '../pages/manageRoleRights/AddEditRoleRights';
import Order from "../pages/Order";
import Saved from "../pages/Saved";
import Setting from "../pages/Setting";
import Forgot from '../layouts/Forgot';
import ResetPassword from '../layouts/ResetPassword';
import { Col, Row } from 'react-bootstrap';
import { useLoading } from "../LoadingContext";
import Loader from '../components/Loader';

import LeaveHistory from '../pages/myLeave/LeaveHistory';
import { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
export default function Layout() {
 
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   debugger
  //   let token=ReactSession.get('accessToken');
  //   console.log("token > " + !token && "is null")
  //   if (!token) {
  //     navigate('/');
  //   }
  // }, []);

  const { loading } = useLoading();
  return (
    <>
      {loading && <Loader />}
      <Header />
      <Row style={{ margin: 0 }}>

        <Col xs={12} style={{ padding: 0 }} >
          <SideBar>
            <Routes>
              <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employeeProfile" element={<EmployeeProfile /> } />
                <Route path="/employeePolicy" element={<EmployeePolicy /> } />
                <Route path="/employee" element={<Employee />} />
                <Route path="/holiday" element={<Holiday />} />
                <Route path="/myLeave" element={<MyLeave/>} />
                <Route path="/leavePolicy" element={<LeavePolicy/>}  />
                <Route path="/manageLeave" element={<ManageLeave />} />
                <Route path="/manageRoleRights" element={<ManageRoleRights />} />
                <Route path="/addEditRoleRights"  element={<AddEditRoleRights />} />
                <Route path="/FuelType" element={<FuelType />} />
                <Route path="/file-manager" element={<FileManager />} />
                <Route path="/order" element={<Order />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/ManageEmployee" element={<ManageEmployee />} />
                <Route path="/LeaveHistory" element={<LeaveHistory />} />
                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
          </SideBar>

        </Col>
      </Row>
      <Footer />
    </>
  );
}


