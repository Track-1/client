import axios from "axios";

export async function postNewPassword(tableName: string, userEmail: string) {
  const body = {
    tableName: tableName,
    userEmail: userEmail,
  };

  return await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword-mail`, JSON.stringify(body), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
