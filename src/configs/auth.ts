const authConfig = {
  meEndpoint: "/auth/me",
  loginEndpoint: "admin/login",
  registerEndpoint: "/jwt/register",
  userDataKeyName: "userData",
  storageTokenKeyName: "accessToken",
  onTokenExpiration: "refreshToken", // logout | refreshToken
};

export default authConfig;
