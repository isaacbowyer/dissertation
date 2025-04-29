import { IOption } from "../../entities/IOption";

export const addWorstOrBestToSeverity = (severity: IOption) => {
  const value = Number(severity?.name);
  const isBestOrWorstValue = value === 0 || 10;

  if (!isBestOrWorstValue) return severity;

  const tag = value === 0 ? "Best" : "Worst";

  return { id: severity?.id, name: `${value} (${tag})` };
};
