import '../assets/styles/App.css';
import Header from './Header';
import Footer from './Footer';
import SideBar from "./SideBar.js";
import React from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from '../pages/Dashboard';
import EmployeeProfile from '../pages/employee/EmployeeProfile'; 
import EmployeePolicy from '../pages/employee/EmployeePolicy';
import ManageEmployee from '../pages/employee/ManageEmployee';
import Employee from '../pages/employee/Employee';
import Holiday from '../pages/holiday/Holiday';
import MyLeave from '../pages/leave/MyLeave';
import LeavePolicy from '../pages/leave/LeavePolicy';
import ManageLeave from '../pages/leave/ManageLeave';
import ManageRole from '../pages/roleRights/ManageRole';
import AddEditRoleRights from '../pages/roleRights/AddEditRoleRights';
import Saved from "../pages/Saved";
import Setting from "../pages/Setting";
import Forgot from '../layouts/Forgot';
import ResetPassword from '../layouts/ResetPassword';
import { Col, Row } from 'react-bootstrap';
import { useLoading } from "../LoadingContext";
import Loader from './Loader';
import LeaveHistory from '../pages/leave/LeaveHistory';
import { useEffect } from 'react';
import { ReactSession } from 'react-client-session';
export default function Layout() {
 
  const navigate = useNavigate();
  
  // useEffect(() => {
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
                <Route path="/manageRole" element={<ManageRole />} />
                <Route path="/addEditRoleRights"  element={<AddEditRoleRights />} />
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


