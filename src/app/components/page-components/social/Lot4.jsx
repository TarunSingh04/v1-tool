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
import { ToastContainer, toast } from "react-toastify";

function Lot4(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);

  // State for the answers
  const [q8Answer, setq8Answer] = useState({
   ...preload.Social.Q8
  });

  const [q9Answer, setq9Answer] = useState({
    ...preload.Social.Q9
  });

  const handleNextPage = (redirect = true) => {
    // Validate that all answers are filled
    if(q8Answer.answer == -1){
      toast.error("Please provide an answer for Question 8 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    if(q8Answer.answer1 == -1){
      toast.error("Please provide an answer for Question 8 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    if(q9Answer.answer == -1){
      toast.error("Please provide an answer for Question 9 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    // Submit the answers
    addAnswer({
      type: "Social",
      question_number: "Q8",
      answer: q8Answer
    });
    addAnswer({
      type: "Social",
      question_number: "Q9",
      answer: q9Answer
    });

    // Move to the next page
    if(redirect)props.onSubmit(4);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={1} STEPS={STEPS} />

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
              <p className={styles.headertext}>Social</p>
              <p className={styles.subheadertext}>
                Work dignity and equal compensation
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_4.map((question, index) => {
                  return (
                    <Question
                    initial={{
                      radio: preload.Social[`Q${question.question_number}`].answer == -1 ? null : preload.Social[`Q${question.question_number}`].answer == 1 ? question.choices[0] :question.choices[1],
                      sub_question : {
                        input:  question.question_number == 9 ? preload.Social.Q9.other : "",
                        radio_choices : question.question_number == 8 ?[
                          preload.Social.Q8.answer == -1? null : preload.Social.Q8.answer == 1 ? "Yes" : "No" ,
                          preload.Social.Q8.answer1 == -1 ? null : preload.Social.Q8.answer1 == 1 ? "Yes" : "No" ,
                        ] : undefined,
                        checkbox_choices : question.question_number == 9 ?
                        preload.Social.Q9.boxes : undefined
                        
                      }
                    }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);
                        if (val.question_number === "8") {
                          if (val.label.includes("Is increasing")) {
                            setq8Answer(prev => ({
                              ...prev,
                              answer: val.value === "Yes" ? 1 : 0
                            }));
                          } else if (val.label.includes("Persons with disabilities")) {
                            setq8Answer(prev => ({
                              ...prev,
                              answer1: val.value === "Yes" ? 1 : 0
                            }));
                          }
                        }
                        if (val.question_number === "9") {
                          if (val.type === "radio") {
                            setq9Answer(prev => ({
                              ...prev,
                              answer: val.value === "Yes" ? 1 : 0
                            }));
                          } else if (val.type === "checkbox") {
                            if (q9Answer.boxes.includes(val.value)) {
                              setq9Answer(prev => ({
                                ...prev,
                                boxes: q9Answer.boxes.filter(item => item !== val.value)
                              }));
                            } else {
                              setq9Answer(prev => ({
                                ...prev,
                                boxes: [...q9Answer.boxes, val.value]
                              }));
                            }
                          } else if (val.type === "input") {
                            setq9Answer(prev => ({
                              ...prev,
                              other: val.value
                            }));
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
            <ProgressBar progress={60} label={"Social - STEP 4"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot4;
