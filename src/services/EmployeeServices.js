import axios from "axios";
import { apiUrl } from "../config";

// axios.defaults.headers.common = {'Authorization': 'eyJraWQiOiJqMzRaRmlwNGgwUEpXaEFISTJMZURxdWtQSlZ2bjVQSzAwWDFWTzN4bTZVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULktldXZ5MG9FV2puYlE3SWkwTHZGYVZTSEhsSHlxMmR0M1ExaGl3WnIxQUUiLCJpc3MiOiJodHRwczovL2Rldi0yOTk0ODUzMy5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2ODk5NDE3NDYsImV4cCI6MTY4OTk0NTM0NiwiY2lkIjoiMG9hOXNjbHg4dEdNUzZJU2I1ZDciLCJ1aWQiOiIwMHU4eDAxaHV0OEFuYjZIQTVkNyIsInNjcCI6WyJwcm9maWxlIiwib3BlbmlkIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNjg5OTQxNzQ0LCJzdWIiOiJtLnRoYWtrYXJAc3VjY2VlZHBhcnRuZXJzLmNvbSJ9.CBHKfuYC5eFzJGba4sQ8uDv00fw2adDtq7ZMb7QrVOHPc3-hTkOYRmS61Alni47vjhK6Z6VJNsFhLjytJzaBYDfWFIZpp3bNuuiBumzLtya_XUIHyTZXNsEQ_hA--ufxVtqADMP_vcqlNr7RuDKH-Bt0PiMPyj8ZLkJG4m2tHbevl3MVDWfm5ejloAkvpzITqiWYbDB3T1Y91_0YLqn8-M-dJgULANcLI_ptPhLmECN2TdTAyog0iH4eiJcdH7ENdLTU7ccZD-vKCanGK6JA0s5OLceSXVvFN_RYmK0np7QzINAVaAju4kAxpKTT0EEgErgc2C8fXpthOsjfSrgu7A'}

export async function getEmployeesList(employeeName, designation, status, email) {
  return await axios.get("http://192.168.1.106:8080/hrm/employee/list?employeeName=&designation=&status=0&email=").then((response) => response.data);
 // return await axios.get("http://192.168.1.106:8080/hrm/employee/list?employeeName="+ employeeName + "&designation" + designation + "&status" + status +"&email" + email ).then((response) => response.data);
}

export async function getEmployeeDetail(employeeId) {
  return axios.get("http://192.168.1.106:8080/hrm/employee/get?employeeId=" + employeeId).then((response) => response.data);
}

export async function deleteEmployee(employeeId) {
 
  try {
    return axios.delete("http://192.168.1.106:8080/hrm/employee/delete?employeeId=" + employeeId,
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

export function addEmployee(employeeId, employeeName, dob, gender, phoneNumber, email, address, designation, experience, status, hiringDate, joiningDate, terminationDate) {
  var details = {
    'employeeId': employeeId,
    'employeeName': employeeName,
    'dob': dob,
    'gender': gender,
    'phoneNumber': phoneNumber,
    'email': email,
    'address': address,
    'designation': designation,
    'experience': experience,
    'status': status,
    'hiringDate': hiringDate,
    'joiningDate': joiningDate,
    'terminationDate': terminationDate
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/employee/save",
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