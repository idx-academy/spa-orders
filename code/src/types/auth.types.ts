type BaseCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = BaseCredentials & {
  firstName: string;
  lastName: string;
};

export type SignInCredentials = BaseCredentials;

export type SignUpResponse = {
  token: string;
};

export type SignInResponse = {
  token: string;
};
