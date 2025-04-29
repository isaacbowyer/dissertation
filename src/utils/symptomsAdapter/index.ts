import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { ISymptom } from "../../entities/ISymptom";

export const symptomsAdapter: ISymptomsAdapter = (docs) => {
  const symptoms = docs?.map((doc) => {
    const data = doc?.data();

    return {
      id: doc?.id,
      name: data?.name,
      description: data?.description,
      imageUri: data?.imageUri,
    };
  });

  return symptoms;
};

interface ISymptomsAdapter {
  (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]): ISymptom[];
}
