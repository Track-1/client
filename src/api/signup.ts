import axios from "axios";

export async function authEmail(formData: any) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function postVerifyCode(formData: any) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/verify`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

export async function joinProducer(formData: any) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/producer`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function joinVocal(formData: any) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/vocal`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
