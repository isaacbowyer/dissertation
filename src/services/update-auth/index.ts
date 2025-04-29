import { updateEmail, updatePassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { ICredential } from "../../entities/ICredential";

export const updateAuth: IUpdateAuthService = async (props) => {
  if (props.password) {
    await updatePassword(auth.currentUser, props?.password);
  }

  await updateEmail(auth.currentUser, props?.email);
};

interface IUpdateAuthService {
  (props: ICredential): Promise<void>;
}
