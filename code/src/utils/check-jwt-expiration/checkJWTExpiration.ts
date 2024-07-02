import { jwtDecode } from "jwt-decode";

const checkJWTExpiration = (token: string) => {
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

export default checkJWTExpiration;
