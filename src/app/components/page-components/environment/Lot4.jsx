import { QUESTION_SET_4, STEPS } from "./constants/constants";
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

  const [q6answer, setq6Answer] = useState({
    ...preload.Environment.Q6
  });

  const [q7answer, setq7Answer] = useState({
    ...preload.Environment.Q7
  });

  // Function to handle moving to the next page
  const handleNextPage = (redirect = true) => {
    // Validate q6answer.name_water_util
    if (!q6answer.name_water_util) {
      toast.error("Please provide a name for the water utility.");
      return false; // Prevent further execution if name_water_util is null or empty
    }

    if(q7answer.answer == -1){
      toast.error("Please provide an answer for Question 7 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    
    }


    // Add answers to the store
    addAnswer({
      type: "Environment",
      question_number: "Q6",
      answer: q6answer,
    });

    addAnswer({
      type: "Environment",
      question_number: "Q7",
      answer: q7answer,
    });

    // Move to the next page
    if(redirect)props.onSubmit(5);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

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
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Water & wastewater management
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_4.map((question, index) => {
                  return (
                    <Question
                      initial={
                        {
                          radio: preload.Environment[`Q${question.question_number}`].answer == -1 ? null : preload.Environment[`Q${question.question_number}`].answer == 1 ? "Yes": "No",
                          input:  question.question_number == 6 ? preload.Environment.Q6.name_water_util : preload.Environment.Q7.name
                        }
                      }
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.question_number == "6") {
                          if (val.type == "input") {
                            setq6Answer({ ...q6answer, name_water_util: val.value });
                          }
                        } else if (val.question_number == "7") {
                          if (val.type == "input") {
                            setq7Answer({ ...q7answer, name: val.value });
                          } else if (val.type == "radio") {
                            setq7Answer({
                              ...q7answer,
                              answer: val.value == "Yes" ? 1 : 0,
                            });
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
            <ProgressBar progress={60} label={"ENVIRONMENT - STEP 5"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot4;
