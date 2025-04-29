import { IOption } from "./IOption";

export interface IPersonalAccountState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  country: IOption;
  industry: IOption;
  gender: IOption;
  birthDate: Date;
  id?: string;
}
