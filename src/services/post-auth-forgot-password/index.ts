import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase/base";

export const postAuthForgotPassword: IPostAuthForgotPasswordService = async (
  email: string
) => {
  await sendPasswordResetEmail(auth, email);
};

interface IPostAuthForgotPasswordService {
  (email: string): Promise<any>;
}
