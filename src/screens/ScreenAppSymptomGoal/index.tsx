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

const SymptomGoal = () => {
  const { state, methods } = useSymptomGoalContext();

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

          {state?.averageScores?.length > 1 ? (
            <VStack>
              <Accordion
                title="Chart View"
                isDisabled={state?.isFetching}
                hiddenSection={
                  <VStack>
                    <Chart scores={state?.averageScores} />
                    <Text.Regular color="gray" fontStyle="italic">
                      The chart plots data from the latest daily reports over
                      the past four months, calculating the average severity
                      rating for each month.
                    </Text.Regular>
                  </VStack>
                }
              />

              <Divider my="$0.5" />
            </VStack>
          ) : null}

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
                tagList={state?.tagList}
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
                <Select
                  selectedOption={state?.targetSeverity}
                  label="Target Score"
                  items={state?.severityList}
                  onChange={(value) =>
                    methods.handleOnChange("targetSeverity", value)
                  }
                />

                <DatePicker
                  label="Target Date"
                  date={state?.targetDate}
                  onChange={(event, newDate) =>
                    methods.handleOnChange("targetDate", newDate)
                  }
                  maxDate={new Date()}
                />
              </VStack>
            }
          />

          <Divider mt="$0.5" mb="$8" />

          <Button.Solid
            text="Track Symptom Progress"
            onPress={methods.handleOnPress}
          />
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
