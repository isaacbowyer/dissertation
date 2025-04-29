import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { IUser } from "../../entities/IUser";

export const usersAdapter: IUsersAdapter = (docs) => {
  const users = docs?.map((doc) => {
    const data = doc?.data();

    const dateOfBirthTimestamp: Timestamp = data?.dateOfBirth;

    return {
      id: doc?.id,
      firstName: data.firstName,
      lastName: data.lastName,
      companyName: data.companyName,
      country: data.country,
      industry: data.industry,
      gender: data.gender,
      birthDate: dateOfBirthTimestamp?.toDate(),
    };
  });

  return users;
};

interface IUsersAdapter {
  (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]): IUser[];
}
