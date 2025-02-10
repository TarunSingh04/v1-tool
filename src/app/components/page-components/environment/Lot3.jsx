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
import { toast, ToastContainer } from "react-toastify"; // Importing toast for error notifications

function Lot3(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [q4answer, setq4Answer] = useState({
    ...preload.Environment.Q4
  });

  const [q5answer, setq5Answer] = useState({
    ...preload.Environment.Q5
  });

  // Function to handle moving to the next page
  const handleNextPage = (redirect = true) => {
    // Validation: Check if q4answer or q5answer is null
    if (q4answer.answer === -1) {
      toast.error("Please provide an answer for Question 4 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    if (q5answer.answer === -1) {
      toast.error("Please provide an answer for Question 5 before proceeding.");
      return false; // Prevent further execution if q5answer is null
    }

    // Add the answers to the store
    addAnswer({
      type: "Environment",
      question_number: "Q4",
      answer: q4answer,
    });

    addAnswer({
      type: "Environment",
      question_number: "Q5",
      answer: q5answer,
    });

    // Move to the next page
    if(redirect)props.onSubmit(4);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(2);
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
                Energy efficiency: How to avoid costly waste in production or in provision of services and in operating infrastructure
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_3.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio: preload.Environment[`Q${question.question_number}`].answer == 1 ? "Yes" : preload.Environment[`Q${question.question_number}`].answer == 0?"No" : null,
                        sub_question : question.question_number == 4 ? {
                            radio_choices: [
                              preload.Environment.Q4.cover_50,
                              preload.Environment.Q4.cover_50_80,
                              preload.Environment.Q4.cover_80,
                            ]
                        } : undefined
                      }}
                      questionBottomWidget={question.questionBottomWidget}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.question_number === "4") {
                          if (val.value === "Yes") {
                            setq4Answer({ ...q4answer, answer: 1 });
                          } else if (val.value === "No") {
                            setq4Answer({ ...q4answer, answer: 0 });
                          }

                          if (val.label.includes("less")) {
                            setq4Answer({ ...q4answer, cover_50: val.value });
                          } else if (val.label.includes("to")) {
                            setq4Answer({ ...q4answer, cover_50_80: val.value });
                          } else if (val.label.includes("over")) {
                            setq4Answer({ ...q4answer, cover_80: val.value });
                          }
                        } else if (val.question_number === "5") {
                          if (val.value === "Yes") {
                            setq5Answer({ ...q5answer, answer: 1 });
                          } else if (val.value === "No") {
                            setq5Answer({ ...q5answer, answer: 0 });
                          }
                        }
                      }}
                    />
                  );
                })}
              </ul>

              {/* Next Button */}
              <PrimaryButton
                onClick={handleNextPage}
                label={"NEXT PAGE"}
              />
            </div>

            {/* Progress */}
            <ProgressBar progress={48} label={"ENVIRONMENT - STEP 4"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot3;
