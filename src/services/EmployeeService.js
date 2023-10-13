import axios from "axios";
 //axios.defaults.headers.common = {'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzYWdhci5kQGNlbWVudGRpZ2l0YWwuY29tIiwiZXhwIjoxNjkzODQzMDM2LCJpYXQiOjE2OTM4MjUwMzZ9.TpcXa64RF708o7p59rRuyJjE7r-YXWrrkKtYpC6hB8eiVH3j5ySofPaNKhNoFLOZwCbn22hOHGaO012w59PcYA'}

// export async function getEmployeesList(employeeName, designation, status, email) {
//  return await axios.get("http://192.168.1.106:8080/hrm/employee/list?employeeName=&designation=&status=0&email=").then((response) => response.data);
//  return await axios.get("http://192.168.1.106:8080/hrm/employee/list?employeeName="+ employeeName + "&designation=" + "1" + "&status=" + "0" +"&email=" + email).then((response) => response.data);
// }


export async function getEmployeesList(employeeName, designationId, status, email) {
  var details = {
    'employeeName': employeeName,
    'designationId': designationId,
    'status': status,
    'email': email
  };
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/employee/list",
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

export async function getEmployeeDetail(employeeId) {
  return axios.get("http://192.168.1.106:8080/hrm/employee/get?employeeId=" + employeeId ).then((response) => response.data);
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

export async function updateEmployeesStatus(employeeId, status) {
  var details = {
    'employeeId': employeeId,
    'status': status
  };
  try {
    return await axios.post("http://192.168.1.106:8080/hrm/employee/status",
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


export function addEmployee(employeeId, employeeName, dob, gender, phoneNumber, email, address,designationId,reportingEmployees, experience, status, hiringDate, joiningDate, terminationDate) {
  var details = {
    'employeeId': employeeId,
    'employeeName': employeeName,
    'dob': dob,
    'gender': gender,
    'phoneNumber': phoneNumber,
    'email': email,
    'address': address,
    'designationId':designationId,
    'reportingEmployees':reportingEmployees,
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

export async function bindDesignation() {

  return await axios.get("http://192.168.1.106:8080/hrm/designation/bindlist").then((response) => response.data);
}

export async function bindReportingEmployee() {
  return await axios.get("http://192.168.1.106:8080/hrm/employee/bindlist").then((response) => response.data);
}

export async function manageEmployees() {
   return await axios.get("http://192.168.1.106:8080/hrm/employee/manage").then((res) => res.data);
}
