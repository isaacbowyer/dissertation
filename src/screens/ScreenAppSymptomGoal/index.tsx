import { Divider, VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { SymptomGoalProvider, useSymptomGoalContext } from "./context";
import { Accordion } from "../../components/atoms/Accordion";
import { Select } from "../../components/atoms/Select";
import { DatePicker } from "../../components/atoms/DatePicker";
import { Chart } from "../../components/atoms/Chart";
import { Text } from "../../components/atoms/Text";
import { Button } from "../../components/atoms/Button";
import { OverallProgressCard } from "../../components/organisms/OverallProgressCard";
import { SymptomResourcesSection } from "./components/SymptomResourcesSection";
import { Tags } from "../../components/modules/Tags";

const SymptomGoal = () => {
  const { state, methods } = useSymptomGoalContext();

  const formattedChartType = state.chartType.toLowerCase();

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack>
          <MainHeader title={state?.title} isFetching={state?.isFetching} />
          <Accordion
            title="Overall Progress"
            isDisabled={state?.isFetching}
            hiddenSection={
              <OverallProgressCard
                currentSeverity={state?.currentSeverity}
                targetSeverity={+state?.targetSeverity?.name}
                daysLeft={state?.daysLeft}
              />
            }
          />

          <Divider my="$0.5" />

          <Accordion
            title="Chart View"
            isDisabled={state?.isFetching}
            hiddenSection={
              <VStack space="md">
                {!state.isFetching ? (
                  <>
                    <Tags
                      tagList={state.chartTags}
                      active={state.chartType}
                      handleSetActive={(value) =>
                        methods.handleOnChange("chartType", value)
                      }
                    />
                    <Chart scores={state?.averageScores} />
                    <Text.Regular color="gray" fontStyle="italic">
                      The chart plots data from the latest daily reports over
                      the past {state.averageScoresLimit} {formattedChartType}s,
                      calculating the average severity rating for each{" "}
                      {formattedChartType}.
                    </Text.Regular>
                  </>
                ) : null}
              </VStack>
            }
          />

          <Divider my="$0.5" />

          <Accordion
            title="Symptom Resources"
            hiddenSection={
              <SymptomResourcesSection
                totalPages={state?.totalPages}
                currentPage={state?.currentPage}
                count={state?.count}
                limit={state?.limit}
                numberOfUsers={state?.numberOfUsers}
                resources={state?.resources}
                isFetching={state?.isFetching}
                tagList={state?.resourceTags}
                source={state.activeSource}
                types={state?.resourceTypes}
                handleOnChange={methods.handleOnChange}
                handleOnLike={methods.handleOnLike}
                handleOnView={methods.handleOnView}
              />
            }
          />

          <Divider my="$0.5" />

          <Accordion
            title="Options"
            isDisabled={state?.isFetching}
            hiddenSection={
              <VStack width="$full" space="xl">
                <VStack space="md">
                  <Select
                    selectedOption={state?.formattedTargetSeverity}
                    label="Target Severity"
                    items={state.severityList}
                    onChange={(value) =>
                      methods.handleOnChange("targetSeverity", value)
                    }
                  />

                  <Text.Regular color="gray" fontStyle="italic">
                    This value must be lower than the Current Severity
                  </Text.Regular>
                </VStack>

                <DatePicker
                  label="Target Date"
                  date={state?.targetDate}
                  onChange={(event, newDate) =>
                    methods.handleOnChange("targetDate", newDate)
                  }
                  minDate={new Date()}
                />
              </VStack>
            }
          />

          <Divider mt="$0.5" mb="$8" />

          <VStack space="md" width="$full">
            <Button.Solid
              text="Track Symptom Progress"
              onPress={methods.handleOnPress}
              isDisabled={state?.isButtonDisabled}
            />
            {!state?.isButtonDisabled ? (
              <Text.Small fontStyle="italic" textAlign="center">
                You can submit a severity score for each symptom once every 24
                hours.
              </Text.Small>
            ) : null}

            {state?.isButtonDisabled && !state?.isPastDateReached ? (
              <Text.Small fontStyle="italic" textAlign="center">
                You have allready submitted a severity score for this symptom
                today.
              </Text.Small>
            ) : null}

            {state?.isPastDateReached ? (
              <Text.Small fontStyle="italic" textAlign="center">
                You can no longer track the progress of this symptom because the
                target date has passed.
              </Text.Small>
            ) : null}
          </VStack>
        </VStack>
      }
    />
  );
};

export const SymptomGoalScreen = ({ navigation }) => {
  return (
    <SymptomGoalProvider>
      <SymptomGoal />
    </SymptomGoalProvider>
  );
};
