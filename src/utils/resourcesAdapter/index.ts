import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { IResource } from "../../entities/IResource";

export const resourcesAdapter: IResourcesAdapter = (props) => {
  const resources: IResource[] = props?.resourceDocs?.map((doc) => {
    const data = doc?.data();

    const createdAtTimestamp: Timestamp = data?.createdAt;

    return {
      id: doc?.id,
      symptomId: data?.symptomId,
      typeId: data?.typeId,
      link: data?.link,
      information: data?.information,
      companyName: data?.companyName,
      companyDetails: data?.companyDetails,
      companyLogo: data?.companyLogo,
      createdAt: createdAtTimestamp?.toDate(),
    };
  });

  return resources;
};

interface IPayload {
  userId: string;
  resourceDocs: QueryDocumentSnapshot<DocumentData, DocumentData>[];
}
interface IResourcesAdapter {
  (props: IPayload): IResource[];
}
