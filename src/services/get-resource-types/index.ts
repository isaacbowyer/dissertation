import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { optionsAdapter } from "../../utils/optionsAdapter";
import { IOption } from "../../entities/IOption";

export const getResourceTypes: IGetResourceTypesService = async () => {
  const { docs } = await getDocs(collection(db, "types"));

  const options = optionsAdapter(docs);
  return [...options, { id: "91sehfsdfs221", name: "All" }];
};

interface IGetResourceTypesService {
  (): Promise<IOption[]>;
}
