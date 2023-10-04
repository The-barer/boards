export interface ILoginFormFields {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  token: string;
}

export interface IUserAuthResponse {
  id: string;
  email?: string | null;
  vk_id?: string | null;
  name?: string | null;
  avatar_url?: string | null;
  token: string;
}

export interface IQueryParse {
  [propName: string]: string;
}

export interface IAuthConfig {
  type: string;
  baseUrl: string;
  searchParams: {
    client_id: string;
    redirect_uri: string;
    display?: string;
    scope?: string;
    response_type?: string;
    state?: string;
  };
}
