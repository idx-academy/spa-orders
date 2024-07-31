import { ExtendedUserDetails } from "@/types/user.types";


export type UsersTableBodyProps = {
  user: ExtendedUserDetails;
};

export type UsersTableProps = {
  users: ExtendedUserDetails[];
};

export type UsersTableHeadProps = {
  head: string;
};
