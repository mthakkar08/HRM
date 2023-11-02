import axios from "axios";
import { apiUrl } from "../config";

export async function getRoleList() {
  try {
    return await axios.get(apiUrl + "/role/list").then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export async function searchRole(roleName) {
  try {
    return await axios
      .get(apiUrl + "/role/search?RoleName=" + roleName)
      .then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export async function getRoleRightsByRoleId(roleId) {
  debugger;
  return axios
    .get(apiUrl + "/rolerights/get?roleId=" + roleId)
    .then((response) => response.data);
}

export async function deleteManageRoleRights(roleId) {
  try {
    return axios
      .delete(apiUrl + "/role/delete?roleId=" + roleId)
      .then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export function updateMenuAccessRights(MenuAccessRightList) {
  debugger;
  try {
    return axios
      .post(
        "http://192.168.1.106:8080/hrm/rolerights/save",
        MenuAccessRightList,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  } catch (error) {
    return error;
  }
}


