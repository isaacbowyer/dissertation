import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { IOption } from "../../entities/IOption";

export const optionsAdapter: IOptionsAdapter = (items) => {
  const options: IOption[] = items?.map((item) => {
    const data = item?.data();

    return {
      id: item?.id,
      name: data?.name,
    };
  });

  return options;
};

interface IOptionsAdapter {
  (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]): IOption[];
}
