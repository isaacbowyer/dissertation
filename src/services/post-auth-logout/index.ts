import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase/base";

export const postAuthLogout: IPostAuthLogoutService = async () => {
  await signOut(auth);
};

interface IPostAuthLogoutService {
  (): Promise<void>;
}
