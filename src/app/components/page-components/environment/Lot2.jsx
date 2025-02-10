import { useState } from "react";
import { QUESTION_SET_2, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { SearchableDropdown } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { toast, ToastContainer } from "react-toastify";

function Lot2(props) {
  const preload = useQuestionnaireStore((state) => state.answers);
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const [showTextFields, setShowTextFields] = useState(false);
  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [selectedOptions, setSelectedOptions] = useState(
    preload.Environment.Q2.utility_energy_provider
      ? [...preload.Environment.Q2.utility_energy_provider]
      : []
  );

  const handleNextPage = (redirect = true) => {
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one energy provider.");
      return false;
    }
    addAnswer({
      type: "Environment",
      question_number: "Q2",
      answer: {
        utility_energy_provider: selectedOptions,
      },
    });
    if(redirect)props.onSubmit(2);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(0);
            }}
            onSave={() => {
               var exit = handleNextPage(false);
              if (exit == false){
                return false;
              }
              saveQuestionnaire();
            }}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Energy source: fossil fuels or green?
              </p>

              {/* Divider */}
              <Divider />
              <ol>
                <li
                  value={2}
                  style={{
                    fontWeight: "600",
                  }}
                >
                  <p className={styles.questiontext}>
                    Please provide your utility energy source provider
                  </p>
                </li>
              </ol>
              {/* Questions */}
              <SearchableDropdown
                initial={selectedOptions}
                label={"Select Utility Energy Source"}
                subLabel={""}
                options={QUESTION_SET_2.choices}
                checkboxDirection="end"
                onChange={(options) => {
                  setSelectedOptions(options);

                  if (options.length === 0) {
                    setShowTextFields(false);
                  }
                }}
                onClick={() => {
                  if (selectedOptions.length > 0) {
                    setShowTextFields(true);
                  }
                }}
              >
                <>
                  <PrimaryButton
                    outlined={true}
                    hasBorder={false}
                    label={"+ ADD PROVIDER"}
                    onClick={() => {}}
                  />
                </>
              </SearchableDropdown>

              {/* Next Button */}
              <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
            </div>

            {/* Progress */}
            <ProgressBar progress={24} label={"ENVIRONMENT - STEP 2"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot2;
