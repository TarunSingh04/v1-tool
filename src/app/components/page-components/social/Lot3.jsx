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
import { toast, ToastContainer } from "react-toastify";

function Lot3(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);


  // State for the answers
  const [q4Answer, setq4Answer] = useState({
    ...preload.Social.Q4
  });

  const [q5Answer, setq5Answer] = useState({
    ...preload.Social.Q5
  });

  const [q6Answer, setq6Answer] = useState({
    ...preload.Social.Q6
  });

  const [q7Answer, setq7Answer] = useState({
    ...preload.Social.Q7
  });

  const handleNextPage = (redirect = true) => {
    // Validate that all answers are filled
    if(q4Answer.answer == -1){
      toast.error("Please provide an answer for Question 4 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    if(q5Answer.value[0] == ''){
      toast.error("Please provide an answer for Question 5 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    if(q6Answer.answer == -1){
      toast.error("Please provide an answer for Question 6 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }


    if(q7Answer.answer == -1){
      toast.error("Please provide an answer for Question 7 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    // Submit the answers
    addAnswer({
      type: "Social",
      question_number: "Q4",
      answer: q4Answer
    });
    addAnswer({
      type: "Social",
      question_number: "Q5",
      answer: q5Answer
    });
    addAnswer({
      type: "Social",
      question_number: "Q6",
      answer: q6Answer
    });
    addAnswer({
      type: "Social",
      question_number: "Q7",
      answer: q7Answer
    });

    // Move to the next page
    if(redirect)props.onSubmit(3);
  };
  
  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={1} STEPS={STEPS} />

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
              <p className={styles.headertext}>Social</p>
              <p className={styles.subheadertext}>
              Work dignity and equal compensation
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_3.map((question, index) => {
                  return (
                    <Question
                    initial={
                      {
                        radio : preload.Social[`Q${question.question_number}`].answer == -1 ? null : preload.Social[`Q${question.question_number}`].answer == 1 ? question.choices[0]: question.choices[1],
                        choices_sub_question : question.question_number == 5 ? {
                          input : {
                            0 : preload.Social.Q5.percentage1,
                            1 : preload.Social.Q5.percentage2,
                          }
                        } : undefined
                      }
                    }
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.question_number == "4"){
                          if (val.value == "Yes"){
                            q4Answer.answer = 1;
                          }
                          else{
                            q4Answer.answer = 0;
                          }
                        }

                        if (val.question_number == "5"){
                          if (val.type == "radio"){
                            q5Answer.value = [val.value];
                            q5Answer.percentage1 = "";
                            q5Answer.percentage2 = "";
                          }
                          else if (val.type == "input"){
                            if (val.label.question.includes("so")){
                              q5Answer.percentage1 = `${val.value}%`;
                            }


                            else if (val.label.question.includes("at")){
                              q5Answer.percentage2 = `${val.value}%`;
                            }
                          }

                        }

                        if (val.question_number == "6"){
                          q6Answer.value = val.value;
                        }

                        if (val.question_number == "7"){
                          if (val.value.includes("Yes")){
                            q7Answer.answer = 1;
                          }
                          else{
                            q7Answer.answer = 0;
                          }
                          console.log(q7Answer.answer);
                          
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

            <ProgressBar progress={50} label={"Social - STEP 3"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right" />
   
    </>
  );
}

export default Lot3;
