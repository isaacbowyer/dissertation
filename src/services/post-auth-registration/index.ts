import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { IOption } from "../../entities/IOption";
import { addDoc, collection } from "firebase/firestore";

export const postAuthRegistration: IPostAuthRegistrationService = async (
  props
) => {
  const { user } = await createUserWithEmailAndPassword(
    auth,
    props?.email,
    props?.password
  );

  const userId = user?.uid;

  await addDoc(collection(db, "users"), {
    userId: userId,
    firstName: props?.firstName,
    lastName: props?.lastName,
    companyName: props?.companyName,
    dateOfBirth: props?.dateOfBirth,
    gender: props?.gender?.name,
    country: props?.country?.name,
    industry: props?.industry?.name,
  });

  await sendEmailVerification(user);

  return user;
};

interface IPostAuthLoginServiceProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string;
  dateOfBirth: Date;
  gender: IOption;
  industry: IOption;
  country: IOption;
}

interface IPostAuthRegistrationService {
  (props: IPostAuthLoginServiceProps): Promise<any>;
}
