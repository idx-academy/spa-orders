import { jwtDecode } from "jwt-decode";

const checkJWTTokenExpiration = (token: string) => {
  try {
    const { exp } = jwtDecode(token);

    if (typeof exp !== "number") {
      return true;
    }

    const expirationTimestampInMs = exp * 1000;
    return Date.now() >= expirationTimestampInMs;
  } catch {
    return true;
  }
};

export default checkJWTTokenExpiration;
