import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { IUser } from "../../entities/IUser";
import { usersAdapter } from "../../utils/usersAdapter";

export const getUser: IGetPersonalDetailsService = async (props) => {
  const collectionRef = collection(db, "users");

  const collectionQuery = query(
    collectionRef,
    where("userId", "==", props?.userId)
  );

  const { docs } = await getDocs(collectionQuery);

  return usersAdapter(docs)[0];
};

interface IProps {
  userId: string;
}

interface IGetPersonalDetailsService {
  (props: IProps): Promise<IUser>;
}
