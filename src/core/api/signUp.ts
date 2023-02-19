import axios from "axios";

interface EmailPropsType{
  tableName:string;
  userEmail:string;
}

export async function authEmail(props:EmailPropsType) {
  const {tableName, userEmail}=props;

  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,{
      "tableName": tableName,
      "userEmail": userEmail
    },{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (e) {
    console.log(e);
  }
}



