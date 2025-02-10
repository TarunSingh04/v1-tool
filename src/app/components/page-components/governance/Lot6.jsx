import { QUESTION_SET_6, STEPS } from "./constants/constants";
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


function Lot6(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);

  // Initialize answer state
  const [q6Answer, setQ6Answer] = useState({
    ...preload.Governance.Q6
  });

  const [q7Answer, setQ7Answer] = useState({
    ...preload.Governance.Q7
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    // Validate answers
    if (q6Answer.answer === -1) {
      toast.error("Please provide an answer for Question 6 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    if (q7Answer.answer === -1) {
      toast.error("Please provide an answer for Question 7 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    // If input field is required (measure) and it's empty
    if (q7Answer.answer === 1 && !q7Answer.measure) {
      toast.error("Please provide a measure for Question 7.");
      return false;
    }

    // Submit answers
    addAnswer({
      type: "Governance",
      question_number: "Q6",
      answer: q6Answer,
    });

    addAnswer({
      type: "Governance",
      question_number: "Q7",
      answer: q7Answer,
    });

    // Go to next page
    if(redirect)props.onSubmit(6);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(4);
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
              <p className={styles.subheadertext}>Data security and privacy protection</p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_6.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio: preload.Governance[`Q${question.question_number}`]?.answer === -1?null : preload.Governance[`Q${question.question_number}`]?.answer === 1
                          ? question.choices[0]
                          : question.choices[1],
                          sub_question : {
                            input : preload.Governance.Q7.measure,
                          }
                      
                        }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.question_number === "6") {
                          if (val.type === "radio") {
                            setQ6Answer({ answer: val.value === "Yes" ? 1 : 0 });
                          }
                        } else if (val.question_number === "7") {
                          if (val.type === "radio") {
                            setQ7Answer({ ...q7Answer, answer: val.value === "Yes" ? 1 : 0 });
                          } else if (val.type === "input") {
                            setQ7Answer({ ...q7Answer, measure: val.value });
                          }
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
            <ProgressBar progress={80} label={"Governance - STEP 6"} />
          </div>
        </div>
      </QuestionLayout>

      {/* Toast Container - Positioned at the bottom right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot6;
