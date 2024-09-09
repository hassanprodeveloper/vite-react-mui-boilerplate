import ky from "ky";
import authConfig from "src/configs/auth";
import { API_BASE_URL } from "src/utils/constants/urls";

const prefixUrl = `${API_BASE_URL ? API_BASE_URL : ""}`;
let headers: any = {
  Accept: "application/json",
};

const token = window.localStorage.getItem(authConfig.storageTokenKeyName)!;
if (token != null) {
  headers = {
    Accept: "application/json",
    Authorization: "Bearer " + token,
  };
}

console.log("URL:::", prefixUrl);
// const hookResponse = await ky(prefixUrl, {
// 	hooks: {
// 		beforeError: [
// 			error => {
// 				const {response} = error;
// 				if (response && response.body) {
// 					error.name = 'GitHubError';
// 					error.message = `${response.body.message} (${response.status})`;
// 				}

// 				return error;
// 			}
// 		]
// 	}
// })
export const secureInstance = (authToken?: string) =>
  instance.extend({
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", "Bearer " + authToken);
        },
      ],
    },
  });

export const instance = ky.extend({
  throwHttpErrors: false,
  prefixUrl,
  headers: headers,
});
