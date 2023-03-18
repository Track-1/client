import axios from "axios";
import { getCookie, removeCookie } from "../../utils/cookie";

export async function onLogout() {
    try{
        const data=await axios.get(
            `${process.env.REACT_APP_BASE_URL}/user/auth/logout`,
            {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("accessToken")}`,
            },
            },
        );
        console.log(data)
        if(data.status===200){
          removeCookie("accessToken");
          window.location.replace("/")
          
        }
    } catch (e) {
        console.log(e);
    }
}

export async function onLogoutAutomatic(){
    removeCookie("accessToken");
    window.location.replace("/")
}