import { QUESTION_SET_4C, STEPS } from "./constants/constants";
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

function Lot4(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
    ...preload.Environment.Q10
  });

  // Function to handle moving to the next page
  const handleNextPage = (redirect = true) => {
    // Check if pollution array is empty
    if (answer.pollution.length === 0) {
      toast.error("Please select at least one type of pollution.");
      return false; // Prevent proceeding if no pollution types are selected
    }

    // Add answers to the store
    addAnswer({
      type: "Environment",
      question_number: "Q10",
      answer: answer,
    });

    // Proceed to the next page
    if(redirect)props.onSubmit(8);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(6);
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
                {QUESTION_SET_4C.map((question, index) => {
                  return (
                    <Question
                      initial={
                        {
                          checkbox: preload.Environment.Q10.pollution,
                          sub_input : preload.Environment.Q10.other
                        }
                      }
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);
                        if (val.for && val.for === "Others") {
                          answer.other = [val.value];

                        } else {
                          if (answer.pollution.includes(val.value)) {
                            answer.pollution.pop(val.value);
                          } else {
                            answer.pollution.push(val.value);
                          }
                          console.log(answer);
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
            <ProgressBar progress={90} label={"ENVIRONMENT - STEP 8"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot4;
