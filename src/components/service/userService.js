import httpService from "./httpService";
import jwtDecode from "jwt-decode";

export function CreateUser(user) {
  return httpService.post("/users", user);
}

const TOKEN_KEY = "TOKEN_KEY";

export async function loginUser(credentials) {
  const { data } = await httpService.post("/auth", credentials);
  console.log(data);
}

const userService = {
  CreateUser,
  loginUser,
};

export default userService;
