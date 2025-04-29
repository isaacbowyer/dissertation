import { IRenderOptionsOutput } from "../../entities/IRenderOptionsOutput";

export const decideScreenStateToRender = (
  input: RenderOptionsInput
): IRenderOptionsOutput => {
  if (input.isFetching) return "loading";
  if (input.isInvalidSearch) return "invalidSearch";
  if (input.entriesLength === 0) return "empty";
  return "results";
};

interface RenderOptionsInput {
  isFetching: boolean;
  entriesLength: number;
  isInvalidSearch?: boolean;
}
