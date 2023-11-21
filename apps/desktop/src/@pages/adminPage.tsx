import { useRecoilValue } from "recoil";
import Admin from "../@components/admin";
import { loginUserId, loginUserType } from "../recoil/common/loginUserData";
import { ROLE } from "../core/common/roleType";
import ErrorPage from "./errorPage";

export default function AdminPage() {
  const userId = useRecoilValue(loginUserId);
  const userType = useRecoilValue(loginUserType);

  function checkAdmin() {
    if (userType === ROLE.PRODUCER) {
      return userId === 8;
    } else {
      return userId === 6;
    }
  }

  return checkAdmin() ? <Admin /> : <ErrorPage />;
}
