import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore/lite";
import { Timestamp } from "firebase/firestore";
import { ISymptomScore } from "../../entities/ISymptomScore";

export const scoresAdapter: IScoresAdapter = (docs) => {
  const scores = docs?.map((doc) => {
    const data = doc?.data();

    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      userId: data?.userId,
      rating: Number(data?.rating),
      createdAt: createdAtTimestamp?.toDate(),
      comment: data?.comment,
    };
  });

  return scores;
};

interface IScoresAdapter {
  (docs: QueryDocumentSnapshot<DocumentData, DocumentData>[]): ISymptomScore[];
}
