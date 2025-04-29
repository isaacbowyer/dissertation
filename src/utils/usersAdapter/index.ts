import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IUser } from "../../entities/IUser";

export const usersAdapter: IUsersAdapter = (docs) => {
  const users = docs?.map((doc) => {
    const data = doc?.data();

    return {
      id: doc?.id,
      firstName: data.firstName,
      lastName: data.lastName,
    };
  });

  return users;
};

interface IUsersAdapter {
  (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]): IUser[];
}
