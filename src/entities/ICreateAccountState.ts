import { IOption } from "./IOption";

export interface ICreateAccountState {
  isLoading: boolean;
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
}
