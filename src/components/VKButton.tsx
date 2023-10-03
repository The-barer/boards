export const VKButton = () => {
  const host: string = "http://localhost:5173";
  const cbLink: string = `${host}/auth/vk`;
  const VK_CLIENT_ID = "51761198";
  const regstate = Math.trunc(Math.random() * 19890903).toString();
  sessionStorage.setItem("regstate", regstate);
  const handleRedirect = () => {
    const authLink = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=popup&redirect_uri=${cbLink}&scope=email&response_type=code&v=5.1310&state=${regstate}`;
    console.log(authLink);
    window.location.href = authLink;
  };

  return (
    <div>
      <button
        onClick={() => {
          handleRedirect();
        }}
      >
        Войти через VK
      </button>
    </div>
  );
};
