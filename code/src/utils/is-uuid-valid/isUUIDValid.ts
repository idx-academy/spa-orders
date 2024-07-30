import { uuidRegex } from "@/constants/regexes";

const isUuidValid = (uuid: unknown) => {
  if (typeof uuid !== "string") return false;

  return uuidRegex.test(uuid);
};

export default isUuidValid;
