import { QUESTION_SET_4A, STEPS } from "./constants/constants";
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

function Lot4A(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
   ...preload.Environment.Q8
  });

  // Function to handle moving to the next page
  const handleNextPage = (redirect = true) => {
    // Check if at least one value is selected
    if (answer.value.length === 0) {
      toast.error("Please select at least one water source.");
      return false; // Prevent proceeding if no values are selected
    }

    // Add answers to the store
    addAnswer({
      type: "Environment",
      question_number: "Q8",
      answer: answer,
    });

    // Proceed to the next page
    if(redirect)props.onSubmit(6);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

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
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Water & wastewater management
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_4A.map((question, index) => {
                  return (
                    <Question
                      initial={
                        {
                          sub_question: {
                            checkbox : preload.Environment.Q8.value,
                            choice_input : {
                            0 : preload.Environment.Q8.rainwater,
                            1: preload.Environment.Q8.wastewater,
                            2: preload.Environment.Q8.greywater,
                            3: preload.Environment.Q8.condensate,
                            4: preload.Environment.Q8.desalinated,
                            5: preload.Environment.Q8.reuse,
                            6: preload.Environment.Q8.other
                            },
                            input: {
                              0 : preload.Environment.Q8.reuse
                            }
                          }
                        }
                      }
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.type === "checkbox") {
                          if (!answer.value.includes(val.value)) {
                            answer.value.push(val.value);
                          } else {
                            answer.value.pop(val.value);
                          }
                        }

                        if (val.type === "sub_input" && val.for) {
                          if (val.for.includes("Harvested")) {
                            answer.rainwater = val.value;
                          } else if (val.for.includes("Reclaimed")) {
                            answer.wastewater = val.value;
                          } else if (val.for.includes("Greywater")) {
                            answer.greywater = val.value;
                          } else if (val.for.includes("Captured")) {
                            answer.condensate = val.value;
                          } else if (val.for.includes("Desalinated")) {
                            answer.desalinated = val.value;
                          } else if (val.for.includes("re-use")) {
                            answer.reuse = val.value;
                          } else if (val.for === "Others") {
                            answer.other = val.value;
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
            <ProgressBar progress={72} label={"ENVIRONMENT - STEP 6"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot4A;
