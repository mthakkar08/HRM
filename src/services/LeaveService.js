import axios from "axios";
import { apiUrl } from "../config";

export async function getLeavesList(leaveSubject, leaveStatus, leaveDate, employeeId,employeeName) {
  var details = {
    'leaveSubject': leaveSubject,
    'leaveStatus': leaveStatus,
    'leaveDate': leaveDate,
    'employeeId': employeeId,
    'employeeName':employeeName
  };
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/leave/list",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function getLeavesDetail(LeaveId) {
  return axios.get("http://192.168.1.106:8080/hrm/leave/get?LeaveId=" + LeaveId).then((response) => response.data);
}

export async function deleteLeave(LeaveId) {
 
  try {
    return axios.delete("http://192.168.1.106:8080/hrm/leave/delete?LeaveId=" + LeaveId,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function updateLeaveStatus(leaveId, userId, approvedMessage, leaveStatus) {
  var details = {
    'leaveId': leaveId,
    'approvedBy': userId,
    'approvedMessage': approvedMessage,
    'leaveStatus': leaveStatus
  };
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/leave/status",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}


export function addLeave(LeaveId, leaveSubject, leaveReason, startDate, endDate, employeeId) {
  
  var details = {
    'leaveId': LeaveId,
    'leaveSubject': leaveSubject,
    'leaveReason': leaveReason,
    'startDate': startDate,
    'endDate': endDate,
    'employeeId': employeeId
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/leave/save",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function getLeaveBalance(employeeId) {

  try {
    return await axios.get("http://192.168.1.106:8080/hrm/leavebalance/get?EmployeeId=" + employeeId,
     
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export function addCompoffLeave(compoffLeave, employeeId, reportingEmployee) {
  
  var details = {
    'compoffLeave': compoffLeave,
    'employeeId': employeeId,
    'reportingEmployee': reportingEmployee
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/leavebalance/save",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function getSortedLeaveList(leaveSubject, leaveStatus, leaveDate, employeeId) {
  var details = {
    'leaveSubject': leaveSubject,
    'leaveStatus': leaveStatus,
    'leaveDate': leaveDate,
    'employeeId': employeeId
  };
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/leave/sortby",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function getLeaveHistory(leaveId) {
  try {
    return await axios.get("http://192.168.1.106:8080/hrm/leave/history?LeaveId="+leaveId).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}