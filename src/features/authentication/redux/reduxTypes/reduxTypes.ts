export type authToken = string | null;
type authStatus = boolean;

export type Auth = {
  tokenId: authToken;
  isLoggedIn: authStatus;
};
