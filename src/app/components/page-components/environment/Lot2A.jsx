import { QUESTION_SET_2A, STEPS } from "./constants/constants";
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

function Lot2A(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);
  const preload = useQuestionnaireStore((state) => state.answers);
  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);

  const [answer, setAnswer] = useState({
    ...preload.Environment.Q3
  });

  // Function to handle moving to the next page
  const handleNextPage = (redirect = true) => {
    // Validation: Check if the 'answer' is null
    if (answer.answer === -1) {
      toast.error("Please provide an answer before proceeding.");
      return false; // Prevent further execution if 'answer' is null
    }

    // If 'answer' is 0 (No), set all other fields to 0
    if (answer.answer === 0) {
      setAnswer({
        ...answer,
        solar: '',
        wind: '',
        biofuels: '',
        hydropower: '',
      });
    }

    // Add the answer to the store
    addAnswer({
      type: "Environment",
      question_number: "Q3",
      answer: answer,
    });

    // Move to the next page
    if(redirect)props.onSubmit(3);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

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
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Energy source: fossil fuels or green?
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_2A.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                          preload.Environment.Q3.answer == 0
                            ? "No"
                            : preload.Environment.Q3.answer == 1 ? "Yes - Please indicate your sources, click every box that applies & provide the percentage (%)  of the total energy you received from that source" : null,
                          sub_question : {
                            checkbox: [
                              preload.Environment.Q3.solar?"Solar Panels": "",

                              preload.Environment.Q3.wind?"Wind Power": "",

                              preload.Environment.Q3.biofuels?"Biofuels": "",

                              preload.Environment.Q3.hydropower?"Hydropower": "",

                            ],
                            choice_input: {
                              0 : preload.Environment.Q3.solar,
                              1 : preload.Environment.Q3.wind,
                              2 : preload.Environment.Q3.biofuels,
                              3 : preload.Environment.Q3.hydropower
                            }
                          }
                          }}
                      questionBottomWidget={question.questionBottomWidget}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        if (val.type === "radio") {
                          if (val.value === "No") {
                            setAnswer({
                              ...answer,
                              answer: 0,
                              solar: "",
                              wind: "",
                              hydropower: "",
                              biofuels: "",
                            });
                          } else {
                            setAnswer({
                              ...answer,
                              answer: 1,
                            });
                          }
                        }

                        if (val.type === "sub_input") {
                          if (val.for === "Wind Power") {
                            setAnswer({ ...answer, wind: `${val.value}%` });
                          } else if (val.for === "Solar Panels") {
                            setAnswer({ ...answer, solar: `${val.value}%` });
                          } else if (val.for === "Biofuels") {
                            setAnswer({ ...answer, biofuels: `${val.value}%` });
                          } else if (val.for === "Hydropower") {
                            setAnswer({ ...answer, hydropower: `${val.value}%` });
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
            <ProgressBar progress={36} label={"ENVIRONMENT - STEP 3"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot2A;
