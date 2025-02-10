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
import useQuestionnaireStore from "../../store/questionnaireStore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Lot5(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [q10Answer, setq10Answer] = useState({
    ...preload.Social.Q10
  });

  const [q11Answer, setq11Answer] = useState({
    ...preload.Social.Q11
  });

  const [q12Answer, setq12Answer] = useState({
    ...preload.Social.Q12
  });

  const [q13Answer, setq13Answer] = useState({
    ...preload.Social.Q13
  });

  const [q14Answer, setq14Answer] = useState({
    ...preload.Social.Q14
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    // Validate answers
    if (q10Answer.answer==-1) {
      toast.error("Please answer all questions for Q10.");
      return false;
    }
    if (q11Answer.answer==-1) {
      toast.error("Please answer all questions for Q11.");
      return false;
    }

    if (q12Answer.answer==-1) {
      toast.error("Please answer all questions for Q12.");
      return false;
    }

    if (q13Answer.answer==-1) {
      toast.error("Please answer all questions for Q13.");
      return false;
    }


    if (q14Answer.answer==-1) {
      toast.error("Please answer all questions for Q14.");
      return false;
    }
    
    if (q11Answer.answer==1 && (!q11Answer.name || !q11Answer.number)) {
      toast.error("Please answer all questions for Q11.");
      return false;
    }
    if (q12Answer.answer==1 && !q12Answer.describe) {
      toast.error("Please answer all questions for Q12.");
      return false;
    }

    if (q13Answer.answer==1 && !q13Answer.describe) {
      toast.error("Please answer all questions for Q13.");
      return false;
    }

    if (q14Answer.answer==1 && !q14Answer.describe) {
      toast.error("Please answer all questions for Q14.");
      return false;
    }

    // Add answers if validation passes
    addAnswer({
      type: "Social",
      question_number: "Q10",
      answer: q10Answer,
    });

    addAnswer({
      type: "Social",
      question_number: "Q11",
      answer: q11Answer,
    });

    addAnswer({
      type: "Social",
      question_number: "Q12",
      answer: q12Answer,
    });

    addAnswer({
      type: "Social",
      question_number: "Q13",
      answer: q13Answer,
    });

    addAnswer({
      type: "Social",
      question_number: "Q14",
      answer: q14Answer,
    });

    // Go to next page
    if(redirect)props.onSubmit(5);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={1} STEPS={STEPS} />

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
              <p className={styles.headertext}>Social</p>
              <p className={styles.subheadertext}>
                Work conditions: Flexibility, safety and health
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_5.map((question, index) => {
                  return (
                    <Question
                      key={`${index}-${question}`}
                      initial={{
                        radio: preload.Social[`Q${question.question_number}`].answer == -1 ?null : preload.Social[`Q${question.question_number}`].answer == 1 ? question.choices[0] :question.choices[1],
                        input: question.question_number == 11 ? [
                          preload.Social.Q11.name,
                          preload.Social.Q11.number
                        ] :  preload.Social[`Q${question.question_number}`].describe,
                     
                      }}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.question_number == "10") {
                          if (val.type == "radio") {
                            q10Answer.answer = val.value == "Yes" ? 1 : 0;
                          } 
                        }

                        if (val.question_number == "11") {
                          console.log("11");
                          if (val.type == "radio") {
                            q11Answer.answer = val.value == "Yes" ? 1 : 0;
                          }
                          else if (val.type == "input"){
                            if (val.label.placeholder.includes("name")){
                              q11Answer.name = val.value;
                            }
                            else if (val.label.placeholder.includes("number")){
                              q11Answer.number = val.value;
                            }

                          } 
                        }

                        if (val.question_number == "12") {
                          if (val.type == "radio") {
                            q12Answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "input") {
                            q12Answer.describe = val.value;
                          }
                        }

                        if (val.question_number == "13") {
                          if (val.type == "radio") {
                            q13Answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "input") {
                            q13Answer.describe = val.value;
                          }
                        }

                        if (val.question_number == "14") {
                          if (val.type == "radio") {
                            q14Answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "input") {
                            q14Answer.describe = val.value;
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

            <ProgressBar progress={80} label={"Social - STEP 5"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot5;
