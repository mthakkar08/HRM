import axios from "axios";
import { apiUrl } from "../config";

axios.defaults.headers.common = {'Authorization': 'eyJraWQiOiJqMzRaRmlwNGgwUEpXaEFISTJMZURxdWtQSlZ2bjVQSzAwWDFWTzN4bTZVIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULktldXZ5MG9FV2puYlE3SWkwTHZGYVZTSEhsSHlxMmR0M1ExaGl3WnIxQUUiLCJpc3MiOiJodHRwczovL2Rldi0yOTk0ODUzMy5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2ODk5NDE3NDYsImV4cCI6MTY4OTk0NTM0NiwiY2lkIjoiMG9hOXNjbHg4dEdNUzZJU2I1ZDciLCJ1aWQiOiIwMHU4eDAxaHV0OEFuYjZIQTVkNyIsInNjcCI6WyJwcm9maWxlIiwib3BlbmlkIiwiZW1haWwiXSwiYXV0aF90aW1lIjoxNjg5OTQxNzQ0LCJzdWIiOiJtLnRoYWtrYXJAc3VjY2VlZHBhcnRuZXJzLmNvbSJ9.CBHKfuYC5eFzJGba4sQ8uDv00fw2adDtq7ZMb7QrVOHPc3-hTkOYRmS61Alni47vjhK6Z6VJNsFhLjytJzaBYDfWFIZpp3bNuuiBumzLtya_XUIHyTZXNsEQ_hA--ufxVtqADMP_vcqlNr7RuDKH-Bt0PiMPyj8ZLkJG4m2tHbevl3MVDWfm5ejloAkvpzITqiWYbDB3T1Y91_0YLqn8-M-dJgULANcLI_ptPhLmECN2TdTAyog0iH4eiJcdH7ENdLTU7ccZD-vKCanGK6JA0s5OLceSXVvFN_RYmK0np7QzINAVaAju4kAxpKTT0EEgErgc2C8fXpthOsjfSrgu7A'}

export async function getFuelList(fuelType) {
  return await axios.get(apiUrl + "/fueltype/list?fuelType=" + fuelType).then((response) => response.data);
}

export async function getFuelTypeDetail(fuelTypeId) {

  return axios.get(apiUrl + "/fueltype/get?fuelTypeId=" + fuelTypeId).then((response) => response.data);
}

export async function deleteFuelType(fuelTypeId) {
  var details = {
    'fuelTypeId': fuelTypeId
  };       

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/fueltype/delete",
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export function addFuelType(fuelTypeId, fuelType, description) {
  var details = {
    'fuelTypeId': fuelTypeId,
    'fuelType': fuelType,
    'description': description
  };

  var formBody = [];
  for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  try {
    return axios.post(apiUrl + "/fueltype/save",
      formBody,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}