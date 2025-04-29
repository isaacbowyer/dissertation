export interface IPersonalAccountStateValidationError {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  companyName: string;
}
