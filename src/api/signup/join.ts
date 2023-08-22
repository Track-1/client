import axios from "axios";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

export async function join(formData: JoinUserDataPropsType, role: string) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/${role}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
