export interface IResource {
  id: string;
  symptomId?: string;
  categoryId?: string;
  typeId: string;
  link: string;
  information: string;
  companyName: string;
  companyDetails: string;
  companyLogo: string;
  createdAt: Date;
}
