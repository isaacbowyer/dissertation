import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export const postAuthLogout: IPostAuthLogoutService = async () => {
  await signOut(auth);
};

interface IPostAuthLogoutService {
  (): Promise<void>;
}
