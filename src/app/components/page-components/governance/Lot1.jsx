import { QUESTION_SET_1, STEPS } from "./constants/constants";
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
import { ToastContainer, toast } from "react-toastify";

function Lot1(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);
  const preload = useQuestionnaireStore((state) => state.answers);
  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);

  // State for the answers
  const [answer, setAnswer] = useState({
    ...preload.Governance.Q1
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    // Validation: Ensure 'name' and 'year' are filled if the answer is 'Yes'
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 1 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    if (answer.answer === 1 && (!answer.name || !answer.year)) {
      toast.error("Please provide Name and Year when answering 'Yes'.");
      return false;
    }

    // Submit the answers
    addAnswer({
      type: "Governance",
      question_number: "Q1",
      answer: answer,
    });

    // Go to next page
    if(redirect)props.onSubmit(1);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

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
              <p className={styles.headertext}>Governance</p>
              <p className={styles.subheadertext}>
                Transparency and anti-corruption:
              </p>

              {/* Divider */}
              <Divider />

              {/* Questions */}
              {QUESTION_SET_1.map((question, index) => {
                return (
                  <Question
                    
                    key={`${index}-${question}`}
                    index={index}
                    question={question}
                    initial={{
                      radio: preload.Governance[`Q${question.question_number}`]?.answer === -1?null : preload.Governance[`Q${question.question_number}`]?.answer === 1 ? question.choices[0] : question.choices[1],
                      sub_question : {
                        input : [
                          preload.Governance.Q1.name,
                          preload.Governance.Q1.year,
                        ]
                      }
                    }}
                    onChange={(val) => {
                      console.log(val);

                      if (val.type === "radio") {
                        answer.answer = val.value === "Yes" ? 1 : 0;
                      }

                      else if (val.type === "input") {
                        if (val.label.placeholder.includes("Name")) {
                          answer.name = val.value;
                        } else if (val.label.placeholder.includes("Year")) {
                          answer.year = val.value;
                        }
                      }
                    }}
                  />
                );
              })}

              {/* Next Button */}
              <PrimaryButton
                onClick={handleNextPage}
                label={"NEXT PAGE"}
              />
            </div>

            {/* Progress */}
            <ProgressBar progress={10} label={"Governance - STEP 1"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot1;
