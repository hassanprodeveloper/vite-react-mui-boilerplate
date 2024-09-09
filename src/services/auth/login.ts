import { parseServerError } from "src/utils/utility";
import { instance } from "../instance";
import { LoginResponse } from "src/types/user";
import authConfig from "src/configs/auth";

export interface LoginModel {
  email: string;
  password: string;
}

export default async (data: LoginModel) => {
  const response: LoginResponse = await instance
    .post(authConfig.loginEndpoint, { json: data, method: "post" })
    .json();

  if (response.success == false) {
    throw new Error(parseServerError(response));
  }
  if (response.admin == null && response.success == true) {
    return response;
  }

  return response;
};
