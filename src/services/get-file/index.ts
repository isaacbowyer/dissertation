import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";

export const getFile: IGetFileService = async (link) => {
  const fileRef = ref(storage, link);

  // Get the download URL of the file
  const url = await getDownloadURL(fileRef);

  return url;
};

interface IGetFileService {
  (link: string): Promise<string>;
}
