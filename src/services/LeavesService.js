import axios from "axios";
import { apiUrl } from "../config";

export async function getLeavesList(leaveSubject, leaveStatus, status, leaveDate) {
  debugger;
  var details = {
    'leaveSubject': leaveSubject,
    'leaveStatus': leaveStatus,
    'status': status,
    'leaveDate': leaveDate
  };
  try {
    return await axios.post("http://192.168.1.106:8081/hrm/leave/list",
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
  debugger;
  return axios.get("http://192.168.1.106:8081/hrm/leave/get?LeaveId=" + LeaveId).then((response) => response.data);
}

export async function deleteLeave(LeaveId) {
 
  try {
    return axios.delete("http://192.168.1.106:8081/hrm/leave/delete?LeaveId=" + LeaveId,
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

export function addLeave(LeaveId, leaveSubject, leaveReason, startDate, endDate) {
  
  var details = {
    'leaveId': LeaveId,
    'leaveSubject': leaveSubject,
    'leaveReason': leaveReason,
    'startDate': startDate,
    'endDate': endDate,
  };
  try {
    return axios.post("http://192.168.1.106:8081/hrm/leave/save",
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
