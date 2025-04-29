import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import Pagination from "@cherry-soft/react-native-basic-pagination";
import { TrackedSymptomsProvider, useTrackedSymptomsContext } from "./context";
import { ICONS } from "../../data/icons";
import { Button } from "../../components/atoms/Button";
import { AdvancedSearch } from "../../components/organisms/AdvancedSearch";
import { HeaderWithSearch } from "../../components/organisms/HeaderWithSearch";
import { SymptomContainer } from "../../components/organisms/SymptomContainer";
import { SubHeaderWithTags } from "../../components/modules/SubHeaderWithTags";
import { IllustrationStateEmpty } from "../../components/modules/IllustrationState.Empty";
import { IllustrationInvalidSearch } from "../../components/modules/IllustrationState.InvalidSearch";
import { IllustrationStateLoading } from "../../components/modules/IllustrationState.Loading";

const Symptoms = () => {
  const { state, methods } = useTrackedSymptomsContext();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <HeaderWithSearch
            title="Long-Covid Symptoms"
            count={state?.count}
            search={{
              isSearchActive: state?.isSearchActive,
              handleOnSearch: methods.handleToggleSearch,
            }}
            isFetching={state?.isFetching}
          />
          {state?.isSearchActive ? (
            <AdvancedSearch
              state={{
                symptom: state?.symptomName,
                severityType: state?.severityType,
                targetRating: state?.targetRating,
                currentRating: state?.currentRating,
                targetDate: state?.targetDate,
                ratingList: state?.ratingOptions,
                severityList: state?.severityTypeOptions,
                source: state?.source,
              }}
              methods={{
                handleOnChange: methods.handleSetSearch,
                handleSetSymptomName: methods.handleSetSymptomName,
              }}
            />
          ) : null}
          <SubHeaderWithTags
            pageCount={state?.totalPages}
            currentPage={state?.currentPage}
            entriesCount={state?.count}
            currentEntries={state?.symptoms?.length}
            isFetching={state?.isFetching}
            label="symptoms"
            activeSource={state?.source}
            handleOnChange={(val) => methods.handleOnChange("source", val)}
            tagList={state?.tagList}
          />

          <VStack w="$full">
            {state.screenState === "loading" ? (
              <IllustrationStateLoading skeletonType="symptom" />
            ) : null}

            {state.screenState === "empty" ? (
              <IllustrationStateEmpty message="You are not tracking any symptoms yet" />
            ) : null}

            {state.screenState === "invalidSearch" ? (
              <IllustrationInvalidSearch loadWhat="symptoms" />
            ) : null}

            {state.screenState === "results" ? (
              <>
                <SymptomContainer
                  items={state?.symptoms}
                  isLoading={state?.isLoading}
                  handleOnDelete={methods?.handleOnDelete}
                  handleOnView={methods.handleOnPress}
                />
                <Pagination
                  totalItems={state?.count}
                  pageSize={state?.limit}
                  currentPage={state?.currentPage}
                  onPageChange={(newPage) =>
                    methods.handleOnChange("currentPage", newPage)
                  }
                />
              </>
            ) : null}
          </VStack>

          <Button.Solid
            icon={ICONS.ADD}
            text="Add Symptom"
            onPress={methods.handleOnAdd}
          />
        </VStack>
      }
    />
  );
};

export const SymptomsScreen = ({ navigation }) => {
  return (
    <TrackedSymptomsProvider>
      <Symptoms />
    </TrackedSymptomsProvider>
  );
};
6;
