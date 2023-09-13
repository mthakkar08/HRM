import axios from "axios";
import { apiUrl } from "../config";

// axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWdhci5kQGNlbWVudGRpZ2l0YWwuY29tIiwiZXhwIjoxNjkzODQzMDM2LCJpYXQiOjE2OTM4MjUwMzZ9.TpcXa64RF708o7p59rRuyJjE7r-YXWrrkKtYpC6hB8eiVH3j5ySofPaNKhNoFLOZwCbn22hOHGaO012w59PcYA'}

// export async function getEmployeesList(employeeName, designation, status, email) {
//  return await axios.get("http://192.168.1.40:8080/hrm/employee/list?employeeName=&designation=&status=0&email=").then((response) => response.data);
//  return await axios.get("http://192.168.1.40:8080/hrm/employee/list?employeeName="+ employeeName + "&designation=" + "1" + "&status=" + "0" +"&email=" + email).then((response) => response.data);
// }


export async function getHolidayList(fromDate, toDate) {
  var details = {
    'fromDate': fromDate,
    'toDate': toDate
  };
  try {
    return await axios.post("http://192.168.1.40:8080/hrm/holiday/list",
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

export async function getHolidayDetail(holidayId) {
  debugger;
  return axios.get("http://192.168.1.40:8080/hrm/employee/get?employeeId=" + holidayId).then((response) => response.data);
}

export async function deleteHoliday(holidayId) {
 
  try {
    return axios.delete("http://192.168.1.40:8080/hrm/holiday/delete?holidayId=" + holidayId,
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

// export async function updateEmployeesStatus(employeeId, status) {
//   debugger;
//   var details = {
//     'employeeId': employeeId,
//     'status': status
//   };
//   try {
//     return await axios.post("http://192.168.1.40:8080/hrm/employee/status",
//       details,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       }
//     ).then((res) => res.data);
//   }
//   catch (error) {
//     return error;
//   }
// }


export function addHoliday(holidayId, holidayName, holidayDate, description, status) {
  var details = {
    'holidayId': holidayId,
    'holidayName': holidayName,
    'holidayDate': holidayDate,
    'description': description,
    'status': status
  };
  try {
    return axios.post("http://192.168.1.40:8080/hrm/holiday/save",
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

// export async function bindDesignation() {
//   return await axios.get("http://192.168.1.40:8080/hrm/designation/bindlist").then((response) => response.data);
// }