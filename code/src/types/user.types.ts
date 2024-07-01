export type User = {
  email: string;
  firstName: string;
  lastName: string;
};

export type UserDetails = User & {
  token: string;
};
