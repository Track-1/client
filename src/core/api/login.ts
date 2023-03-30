import { client } from "./common/axios";

export async function onLogin(id: string, password: string, loginType: string) {
  const body = {
    ID: id,
    PW: password,
    tableName: loginType,
  };

  return await client.post(`${process.env.REACT_APP_BASE_URL}/user/auth/login`, body, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}
