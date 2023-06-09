import { Board } from "../types/boardTypes";
import { PaginationParams } from "../types/common";
import { Status } from "../types/statusTypes";
import { Task } from "../types/taskTypes";
import { User } from "../types/userTypes";

const API_BASE_URL = "https://reactforall.onrender.com/api/";
type RequestData =
  | { username: string; password: string }
  | Board
  | PaginationParams
  | string
  | Task
  | User
  | Status
  | {};
type RequestMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
export const request = async (
  endpoint: string,
  method: RequestMethod = "GET",
  data: RequestData = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map(
            (key) => `${key}=${(data as RequestData)[key as keyof RequestData]}`
          )
          .join("&")}`
      : "";
    url = `${API_BASE_URL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }
  //Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },

      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    console.log(error);
  }
};

/**Auth */
export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const register = (user: User) => {
  return request("auth/registration/", "POST", user);
};
/**Users */
export const me = () => {
  return request("users/me", "GET", {});
};

export const addUser = (user: User) => {
  return request("users/", "POST", user);
};
/**Boards */
export const getBoards = () => {
  return request("boards/", "GET", {});
};

export const createBoard = (board: Board) => {
  return request("boards/", "POST", board);
};
export const editBoard = (board: Board, id: number) => {
  return request(`boards/${id}/`, "PATCH", board);
};
export const getBoard = (id: number) => {
  return request(`boards/${id}/`, "GET", {});
};

export const deleteBoard = (id: number) => {
  return request(`boards/${id}/`, "DELETE", {});
};

/**Tasks */
export const getTasks = (id: number) => {
  return request(`boards/${id}/tasks/`, "GET", {});
};

export const getTaskApi = (id: number, taskId: number) => {
  return request(`boards/${id}/tasks/${taskId}/`, "GET", {});
};
export const createTaskApi = (task: Task, id: number) => {
  return request(`boards/${id}/tasks/`, "POST", task);
};
export const updateTaskApi = (task: Task, id: number, taskId: number) => {
  return request(`boards/${id}/tasks/${taskId}/`, "PATCH", task);
};

export const deleteTaskApi = (taskId: number, boardId: number) => {
  return request(`boards/${boardId}/tasks/${taskId}/`, "DELETE", {});
};

// export const updateTaskStatusApi = (statusId: Task, id: number) => {
//   return request(`boards/${id}/tasks/`, "PATCH", {status:statusId});
// }
/**Status */
export const getStatusesApi = () => {
  return request(`status/`, "GET", {});
};

export const createStatusApi = (status: Status) => {
  return request(`status/`, "POST", status);
};

export const updateStatusApi = (status: Status, id: number) => {
  return request(`status/${id}/`, "PATCH", status);
};

export const deleteStatusApi = (id: number) => {
  return request(`status/${id}/`, "DELETE", {});
};
