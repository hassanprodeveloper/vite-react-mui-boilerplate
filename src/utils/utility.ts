import { Option } from "src/types/user";

export const isValidEmail = (email: string) => {
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
};
export const parseServerError = (
  data: any,
  defaultMessage = "Something went wrong"
) => {
  let error = "";
  if (typeof data === "string") {
    error = data;
  }
  if (data.message != null) {
    if (typeof data.message === "string") {
      error = data.message;
    }
  }
  if (data.errors != null) {
    if (typeof data.errors == "object") {
      const keys = Object.keys(data.errors);
      if (keys.length > 0) {
        const errors = data.errors[keys[0]];
        if (errors.length > 0) {
          error = errors[0];
        }
      }
    }
  }
  if (error == "") {
    error = defaultMessage;
  }
  return error;
};
export function findSeletedOption(list?: Array<Option>) {
  const objectsFound = list?.filter((item) => item.selected == true);
  if (objectsFound != null) {
    if (objectsFound.length > 0) {
      return objectsFound[0];
    } else {
      return {
        name: "",
        value: "",
      };
    }
  } else {
    return {
      name: "",
      value: "",
    };
  }
}
