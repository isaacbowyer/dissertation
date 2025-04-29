export const adjustSeverityValue = (option: any) => {
  const isBestOrWorstValue = option?.name?.includes("(");

  if (isBestOrWorstValue) {
    return { id: option?.id, name: option.name.split(" ")[0] };
  }

  return option;
};
