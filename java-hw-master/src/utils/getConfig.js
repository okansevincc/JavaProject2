export default function getConfig() {
  const tokenKey = localStorage.getItem("tokenKey");
  const config = {
    headers: {
      Authorization: tokenKey,
    },
  };
  return config;
}
