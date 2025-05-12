import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { ILoginData } from "../../entities/ILoginData";

export const postAuthLogin: IPostAuthLoginService = async (payload) => {
  const data = await signInWithEmailAndPassword(
    auth,
    payload.email,
    payload.password
  );

  return data;
};

interface IPostAuthLoginService {
  (payload: ILoginData): Promise<any>;
}
