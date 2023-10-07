import { useRef } from "react";
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
  const authUrl = useRef<string>("");
  const getAuthURL = ({ baseUrl, searchParams }: IAuthConfig) => {
    const params = new URLSearchParams(searchParams);
    const url = new URL(baseUrl) + "?" + params.toString();
    return url;
  };

  authUrl.current = getAuthURL(config);

  return (
    <div>
      <button
        onClick={() => {
          onSubmit(authUrl.current, config.type);
        }}
      >
        {children}
      </button>
      {err && <p>Error {config.type.toUpperCase()} login</p>}
    </div>
  );
};
