import { QUESTION_SET_5, STEPS } from "./constants/constants";
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
import { useState } from "react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer


function Lot5(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  // Initialize answer state
  const [answer, setAnswer] = useState({
    ...preload.Governance.Q5,
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    // Validate the answer
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 5 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }    

    // If input field is required (measure) and it's empty
    if (answer.answer === 1 && !answer.measure) {
      toast.error("Please provide a measure.");
      return false;
    }

    // Submit the answers
    addAnswer({
      type: "Governance",
      question_number: "Q5",
      answer: answer,
    });

    // Go to next page
    if(redirect)props.onSubmit(5);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(3);
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
              <p className={styles.subheadertext}>Risk management</p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_5.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                          preload.Governance[`Q${question.question_number}`]?.answer === -1?null : preload.Governance[`Q${question.question_number}`]?.answer === 1
                            ? question.choices[0]
                            : question.choices[1],
                            sub_question : {
                              input : preload.Governance.Q5.measure,
                            }
                      }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.type == "radio") {
                          answer.answer = val.value == "Yes" ? 1 : 0;
                        } else if (val.type == "input") {
                          answer.measure = val.value;
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
            <ProgressBar progress={70} label={"Governance - STEP 5"} />
          </div>
        </div>
      </QuestionLayout>

      {/* Toast Container - Positioned at the bottom right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot5;
