import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { optionsAdapter } from "../../utils/optionsAdapter";
import { IOption } from "../../entities/IOption";

export const getResourceCategories: IGetResourceCategoriesService =
  async () => {
    const { docs } = await getDocs(collection(db, "categories"));

    return optionsAdapter(docs);
  };

interface IGetResourceCategoriesService {
  (): Promise<IOption[]>;
}
