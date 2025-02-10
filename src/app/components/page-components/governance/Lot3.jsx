import { QUESTION_SET_3, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { Question } from "../../utilities/components/questionnaire/question/question";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer


function Lot3(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  // Initialize answer state
  const [answer, setAnswer] = useState({
    ...preload.Governance.Q3
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 3 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    // If input field is required (compensation package) and it's empty
    if (answer.answer == 1 && !answer.compensation_package) {
      toast.error("Please provide a compensation package.");
      return false;
    }

    // Submit the answers
    addAnswer({
      type: "Governance",
      question_number: "Q3",
      answer: answer,
    });

    // Go to next page
    if(redirect)props.onSubmit(3);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(1);
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
              <p className={styles.headertext}>Governance</p>
              <p className={styles.subheadertext}>
                Carbon offset schemes and other compensation methods
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_3.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                        preload.Governance[`Q${question.question_number}`]
                            ?.answer === -1 ? null :
                          preload.Governance[`Q${question.question_number}`]?.answer === -1?null : preload.Governance[`Q${question.question_number}`]?.answer === 1
                            ? question.choices[0]
                            : question.choices[1],
                            sub_question : {
                              input : preload.Governance.Q3.compensation_package,
                              
                            }
                       }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.type == "radio") {
                          answer.answer = val.value == "Yes" ? 1 : 0;
                        } else if (val.type == "input") {
                          answer.compensation_package = val.value;
                        }
                      }}
                    />
                  );
                })}
              </ul>

              {/* Next Button */}
              <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
            </div>

            {/* Progress */}
            <ProgressBar progress={40} label={"Governance - STEP 3"} />
          </div>
        </div>
      </QuestionLayout>

      {/* Toast Container - Positioned at the bottom right */}
      <ToastContainer
        position="bottom-right" // Position the toast at the bottom right
      />
    </>
  );
}

export default Lot3;
