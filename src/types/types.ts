export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface IUserResponse {
  email: string;
  authUserId: string | null;
  userName: string;
  photo: string | null;
  isAvtiveted: boolean;
}
export interface IUserAuthResponse extends ITokens {
  user: IUserResponse;
}

export interface IQueryParse {
  [propName: string]: string;
}

export interface IAuthConfig {
  type: string;
  baseUrl: string;
  searchParams?: {
    client_id: string;
    redirect_uri: string;
    display?: string;
    scope?: string;
    response_type?: string;
    state?: string;
  };
}
