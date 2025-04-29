import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUser } from "../../entities/IUser";

export const updateUser: IUpdateUserService = async (user) => {
  const docRef = doc(db, "users", user?.id);

  await updateDoc(docRef, {
    ["firstName"]: user?.firstName,
    ["lastName"]: user?.lastName,
    ["companyName"]: user?.companyName,
    ["country"]: user?.country,
    ["industry"]: user?.industry,
    ["gender"]: user?.gender,
    ["birthDate"]: user?.birthDate,
  });
};

interface IUpdateUserService {
  (user: IUser): Promise<any>;
}
