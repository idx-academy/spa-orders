import { User } from "@/types/user.types";

type UserWithFirstAndLastName = Pick<User, "firstName" | "lastName">;

const extractFullname = <User extends UserWithFirstAndLastName>(user: User) => {
  return `${user.firstName} ${user.lastName}`;
};

export default extractFullname;
