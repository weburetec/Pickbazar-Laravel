import Cookies from "js-cookie";
import { CUSTOMER, SUPER_ADMIN } from "./constants";

export function loggedIn() {
  const token = Cookies.get("auth_token");
  if (!token) return false;
  if (token) {
    const permissions = Cookies.get("auth_permissions");
    if (
      !permissions?.includes(CUSTOMER) &&
      !permissions?.includes(SUPER_ADMIN)
    ) {
      return false;
    }
  }
  return true;
}
