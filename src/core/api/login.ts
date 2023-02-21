import axios from "axios";

export async function signIn(id: string, password: string) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      body: {
        ID: id,
        PW: password,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
