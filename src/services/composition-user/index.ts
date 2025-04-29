import { services } from "..";
import { IPersonalAccountState } from "../../entities/IPersonalAccountState";

export const compositionUser: ICompositonUserService = async (props) => {
  await services.update.user({
    id: props?.id,
    firstName: props?.firstName,
    lastName: props?.lastName,
    companyName: props?.companyName,
    country: props?.country?.name,
    industry: props?.industry?.name,
    gender: props?.gender?.name,
    birthDate: props?.birthDate,
  });

  await services.update.auth({
    email: props?.email,
    password: props?.password,
  });
};

interface ICompositonUserService {
  (props: IProps): Promise<any>;
}

interface IProps extends IPersonalAccountState {
  id: string;
}
