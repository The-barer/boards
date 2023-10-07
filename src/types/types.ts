export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserAuthResponse extends ITokens {
  id: string;
  email?: string | null;
  vk_id?: string | null;
  name?: string | null;
  avatar_url?: string | null;
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
