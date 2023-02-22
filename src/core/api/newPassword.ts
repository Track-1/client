import axios from "axios";

export async function postNewPassword(tableName: string, userEmail: string) {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword-mail`, {
      header: {
        "Content-Type": "multipart/form-data",
      },
      body: {
        tableName: tableName,
        userEmail: userEmail,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
