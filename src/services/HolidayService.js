import axios from "axios";
import { apiUrl } from "../config";

export async function getHolidayList(fromDate, toDate,status) {
  var details = {
    'fromDate': fromDate,
    'toDate': toDate,
    'status': status
  };
  try {
    return await axios.post("http://192.168.1.2:8080/hrm/holiday/list",
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
  return axios.get("http://192.168.1.2:8080/hrm/holiday/get?holidayId=" + holidayId).then((response) => response.data);
}

export async function deleteHoliday(holidayId) {
 
  try {
    return axios.delete("http://192.168.1.2:8080/hrm/holiday/delete?holidayId=" + holidayId,
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

export function addHoliday(holidayId, holidayName, holidayDate, description, status) {
  var details = {
    'holidayId': holidayId,
    'holidayName': holidayName,
    'holidayDate': holidayDate,
    'description': description,
    'status': status
  };
  try {
    return axios.post("http://192.168.1.2:8080/hrm/holiday/save",
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
