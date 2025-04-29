import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export const deleteAccount: IDeleteAccountService = async () => {
  const user = auth.currentUser;

  let collectionQuery = query(
    collection(db, "symptom_scores"),
    where("userId", "==", user.uid)
  );

  let snapShot = await getDocs(collectionQuery);

  snapShot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  collectionQuery = query(
    collection(db, "tracked_symptoms"),
    where("userId", "==", user.uid)
  );

  snapShot = await getDocs(collectionQuery);

  snapShot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  collectionQuery = query(
    collection(db, "resource_likes"),
    where("userId", "==", user.uid)
  );

  snapShot = await getDocs(collectionQuery);

  snapShot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  collectionQuery = query(
    collection(db, "notifications"),
    where("userId", "==", user.uid)
  );

  snapShot = await getDocs(collectionQuery);

  snapShot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  collectionQuery = query(
    collection(db, "users"),
    where("userId", "==", user.uid)
  );

  snapShot = await getDocs(collectionQuery);

  snapShot.docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });

  user.delete();
};

interface IDeleteAccountService {
  (): Promise<any>;
}
