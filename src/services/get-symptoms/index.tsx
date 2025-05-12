import { db } from "../../config/firebase";
import { symptomsAdapter } from "../../utils/symptomsAdapter";
import { ISymptom } from "../../entities/ISymptom";
import { collection, getDocs } from "firebase/firestore";

export const getSymptoms: IGetSymptomsService = async () => {
  const { docs } = await getDocs(collection(db, "symptoms"));

  return symptomsAdapter(docs);
};

interface IGetSymptomsService {
  (): Promise<ISymptom[]>;
}
