import { IOption } from "../../entities/IOption";
import { IResourceTypeTag } from "../../entities/IResourceTypeTag";
import { ISymptom } from "../../entities/ISymptom";
import { IUser } from "../../entities/IUser";

export const INITAL_OPTION: IOption = {
  id: "",
  name: "",
};

export const INITAL_SYMPTOM: ISymptom = {
  id: "",
  name: "",
  imageUri: "",
  description: "",
};

export const INITAL_USER: IUser = {
  id: "",
  firstName: "",
  lastName: "",
  companyName: "",
  country: "",
  industry: "",
  gender: "",
  birthDate: new Date(),
};

export const INITAL_TAGS: IResourceTypeTag[] = [
  "All",
  "Website",
  "Video",
  "Document",
  "Favourites",
];
