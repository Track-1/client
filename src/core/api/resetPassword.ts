import { client } from "./common/axios";

export async function patchResetPassword(password: string, token : string) {
  const body = {
    password: password,
  };

  const data = await client.patch(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
