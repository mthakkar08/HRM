import axios from "axios";
import { apiUrl } from "../config";

export async function getLeavePolicyList() {
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/leavepolicy/list",
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

export async function getLeavePolicyDetail(LeavePolicyId) {
  return axios.get("http://192.168.1.106:8080/hrm/leavepolicy/get?LeavePolicyId=" + LeavePolicyId).then((response) => response.data);
}

export async function deleteLeavePolicy(LeavePolicyId) {
  try {
    return axios.delete("http://192.168.1.106:8080/hrm/leavepolicy/delete?LeavePolicyId=" + LeavePolicyId,
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

export function addLeavePolicy(leavePolicyId, leaveCount, startFrom, endTo) {
  var details = {
    'leavePolicyId': leavePolicyId,
    'leaveCount': leaveCount,
    'startFrom': startFrom,
    'endTo': endTo
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/leavepolicy/save",
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
