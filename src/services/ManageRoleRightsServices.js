import axios from "axios";
import { apiUrl } from "../config";

export async function getManageRoleRightsList() {

  try {
    return await axios.get("http://192.168.1.106:8080/hrm/role/list",

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

export async function getManageRoleRightsDetail(roleId) {
  return axios.get("http://192.168.1.106:8080/hrm/rolerights/get?roleId=" + roleId).then((response) => response.data);
}

export async function deleteManageRoleRights(roleId) {

  try {
    return axios.delete("http://192.168.1.106:8080/hrm/role/delete?roleId=" + roleId,
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

export async function updateManageRoleRightsStatus(roleId, status) {
  var details = {
    'roleId': roleId,
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

export function addManageRoleRights(roleId, roleName) {
  var details = {
    'roleId': roleId,
    'roleName': roleName
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

export function getAccessRightsList(RoleId, RoleName, MenuId, MenuName, CreateRightId, EditRightId, ViewRightId, DeleteRightId) {
  
  var details = {
    'RoleId': RoleId,
    'RoleName': RoleName,
    'MenuId': MenuId,
    'MenuName': MenuName,
    'CreateRightId': CreateRightId,
    'EditRightId': EditRightId,
    'ViewRightId': ViewRightId,
    'DeleteRightId': DeleteRightId
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/rolerights/save",
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
