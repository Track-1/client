import axios from "axios";

export async function authEmail(formData:any) {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    data && console.log(data);
    return data
}

export async function checkEmailDuplication(formData:any) {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/check-email`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    // data && console.log(data.data.data.isDuplicate);
    return data.data.data.isDuplicate
}

export async function authEmailRepost(formData:any) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    data && console.log(data);
    return data
  } catch (e) {
    console.log(e);
  }
}


export async function verifyCodePost(formData:any) {
  // try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/verify`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    data && console.log(data);
    return data
  // } catch (e) {
    // console.log(e);
  // }
}