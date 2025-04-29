import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { usersAdapter } from "../../utils/usersAdapter";
import { IUsersResponse } from "../../entities/IUsersResponse";

export const getUsers: IGetUsersService = async () => {
  const { docs } = await getDocs(collection(db, "users"));

  const users = usersAdapter(docs);

  return {
    count: users?.length || 0,
    results: users,
  };
};

interface IGetUsersService {
  (): Promise<IUsersResponse>;
}
