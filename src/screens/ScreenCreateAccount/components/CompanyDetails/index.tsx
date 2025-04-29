import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../../../components/atoms/Text";
import { Input } from "../../../../components/atoms/Input";
import { Select } from "../../../../components/atoms/Select";
import { IOption } from "../../../../entities/IOption";
import { ICreateAccountStateKeyValue } from "../../../../entities/ICreateAccountStateKeyValue";
import { ICreateAccountStateKey } from "../../../../entities/ICreateAccountStateKey";

interface ICompanyDetailsProps {
  name: string;
  country: IOption;
  industry: IOption;
  nameError: string;
  countryOptions: IOption[];
  industryOptions: IOption[];
  handleOnChange: (
    key: ICreateAccountStateKey,
    value: ICreateAccountStateKeyValue
  ) => void;
}

export const CompanyDetails = ({
  name,
  country,
  industry,
  nameError,
  countryOptions,
  industryOptions,
  handleOnChange,
}: ICompanyDetailsProps) => {
  return (
    <VStack space="xl">
      <Text.Regular color="gray">3. Company Details</Text.Regular>

      <Input
        label="Name"
        value={name}
        helpText={nameError}
        onChange={(e) => handleOnChange("companyName", e.nativeEvent.text)}
      />

      <Select
        selectedOption={country}
        label="Country"
        items={countryOptions}
        onChange={(value) => handleOnChange("country", value)}
      />

      <Select
        selectedOption={industry}
        label="Industry"
        items={industryOptions}
        onChange={(value) => handleOnChange("industry", value)}
      />
    </VStack>
  );
};
