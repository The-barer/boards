import { IAuthConfig } from "../Types/types";

interface IAuthButton {
  onSubmit: (url: string, type: string) => void;
  err?: boolean;
  children?: JSX.Element;
  config: IAuthConfig;
}

export const AuthButton = ({
  children,
  onSubmit,
  err,
  config,
}: IAuthButton) => {
  config.searchParams.state &&
    sessionStorage.setItem("regstate", config.searchParams.state);

  const getAuthURL = ({ baseUrl, searchParams }: IAuthConfig) => {
    const params = new URLSearchParams(searchParams);
    return `${baseUrl}?${params.toString()}`;
  };

  const authUrl = getAuthURL(config);
  return (
    <div>
      <button
        onClick={() => {
          onSubmit(authUrl, config.type);
        }}
      >
        {children}
      </button>
      {err && <p>Error {config.type.toUpperCase()} login</p>}
    </div>
  );
};
