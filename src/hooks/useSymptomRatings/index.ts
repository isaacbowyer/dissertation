import { useQuery } from "@tanstack/react-query";
import { useCustomToast } from "../useCustomToast";
import { services } from "../../services";
import { auth } from "../../config/firebase";
import { useAuthenticationContext } from "../../contexts/useAuthenticationContext";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";
import { IScore } from "../../entities/IScore";
import { calculateAverageScores } from "../../utils/calculateAverageScores";

export const useSymptomRatings = (): IUseSymptomIdScoresResponse => {
  const { state } = useAuthenticationContext();
  const { currentSymptom } = useCurrentEntityContext();

  const toast = useCustomToast();

  const { data, isFetching } = useQuery(
    ["/scores"],
    async () => {
      const data = await services.get.scores({
        userId: auth?.currentUser?.uid,
        symptomId: currentSymptom?.symptomId,
      });

      return data;
    },
    {
      enabled: state?.isAuthenticated,
      onError: (e) => {
        toast.errorToast("Failed to load your symptom ratings");
      },
      onSuccess: () => {
        console.log("SUCCESS", "Loaded your symptom ratings successfully");
      },
      initialData: [],
      refetchOnWindowFocus: false,
    }
  );

  return {
    averageScores: calculateAverageScores(data),
    isFetching,
  };
};

interface IUseSymptomIdScoresResponse {
  averageScores: IScore[];
  isFetching: boolean;
}
