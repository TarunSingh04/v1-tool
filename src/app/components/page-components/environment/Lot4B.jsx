import { QUESTION_SET_4B, STEPS } from "./constants/constants";
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
import { toast, ToastContainer } from "react-toastify";

function Lot4B(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
    ...preload.Environment.Q9,
  });

  const handleNextPage = (redirect = true) => {
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 9 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    addAnswer({
      type: "Environment",
      question_number: "Q9",
      answer: answer,
    });
    if (redirect) props.onSubmit(7);
  };
  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(5);
            }}
            onSave={() => {
              var exit = handleNextPage(false);
              if (exit == false) {
                return false;
              }
              saveQuestionnaire();
            }}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Water & wastewater managament
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_4B.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                          preload.Environment.Q9.answer == -1
                            ? null
                            : preload.Environment.Q9.answer == 0
                              ? "No"
                              : "Yes - please indicate what pollution prevention method you use (tick all boxes that apply) and rate the method’s usefulness (good = the method solves the problem; sufficient = not perfect but acceptable; insufficient = does not work, more needs to be done)",
                        sub_question: { 
                          radio_choices: [
                            preload.Environment.Q9.pre_treatment == 1 ? "Yes" : preload.Environment.Q9.pre_treatment == 0 ? "No" : null,
                            preload.Environment.Q9.wastewater == 1 ? "Yes" : preload.Environment.Q9.wastewater == 0 ? "No" : null,
                            preload.Environment.Q9.microplastics == 1 ? "Yes" : preload.Environment.Q9.microplastics == 0 ? "No" : null,
                          ],
                          checked :[
                            preload.Environment.Q9.pre_treatment == -1 ? false : true,

                            preload.Environment.Q9.wastewater == -1 ? false : true,

                            preload.Environment.Q9.microplastics == -1 ? false : true,
                          ],                        
                          input: {
                            0: preload.Environment.Q9.others,
                          },
                        },
                        
                        
                      }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.type == "radio") {
                          if (val.label.includes("Have you")) {
                            if (val.value == "No") {
                              answer.answer = 0;
                            } else {
                              answer.answer = 1;
                            }
                          } else if (val.label.includes("Pre-treatment")) {
                            answer.pre_treatment = val.value == "Yes" ? 1 : 0;
                          } else if (val.label.includes("Wastewater")) {
                            answer.wastewater = val.value == "Yes" ? 1 : 0;
                          } else if (val.label.includes("Microplastics")) {
                            answer.microplastics = val.value == "Yes" ? 1 : 0;
                          }
                        } else if (val.type == "input") {
                          answer.others = val.value;
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

            <ProgressBar progress={84} label={"ENVIRONMENT - STEP 7"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot4B;
