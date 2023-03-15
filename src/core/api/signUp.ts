import axios from "axios";

export async function authEmail(formData:any) {
  // try{
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data
  // }
  // catch(error:any){
  //   console.log(error.response.data.message)
  // }
}

export async function checkEmailDuplication(formData:any) {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/check-email`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.data.data
}

export async function repostAuthEmail(formData:any) {
  // try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data
  // } catch (e) {
  //   console.log(e);
  // }
}

export async function postVerifyCode(formData:any) {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/verify`,formData,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data

}

export async function joinProducer(formData:any) {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/producer`,formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    data && console.log(data);
    return data
}

export async function joinVocal(formData:any) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/vocal`,formData,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  data && console.log(data);
  return data
}
