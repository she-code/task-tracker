import { Board } from "../types/boardTypes";
import { PaginationParams } from "../types/common";

const API_BASE_URL = "https://reactforall.onrender.com/api/";
type RequestData =
  | { username: string; password: string }
  | Board
  | PaginationParams
  | string
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

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};
export const me = () => {
  return request("users/me", "GET", {});
};

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
