import { QUESTION_SET_2, STEPS } from "./constants/constants";
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

function Lot2(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  // Update state initialization like the previous one
  const [q2Answer, setQ2Answer] = useState({
    boxes: preload.Social.Q2.boxes || [],
    description: preload.Social.Q2.description || "",
  });

  const [q3Answer, setQ3Answer] = useState({
    boxes: preload.Social.Q3.boxes || [],
    description: preload.Social.Q3.description || "",
  });

  // Validation function for the checkboxes
  const handleNextPage = (redirect = true) => {
    // Check if at least one checkbox is selected for Q2
    if (q2Answer.boxes.length === 0) {
      toast.error("Please select at least one option for Question 2.");
      return false; // Prevent submission if no checkboxes are selected for Q2
    }

    // Check if at least one checkbox is selected for Q3
    if (q3Answer.boxes.length === 0) {
      toast.error("Please select at least one option for Question 3.");
      return false; // Prevent submission if no checkboxes are selected for Q3
    }

    // Add answer for Q2
    addAnswer({
      type: "Social",
      question_number: "Q2",
      answer: q2Answer,
    });

    // Add answer for Q3
    addAnswer({
      type: "Social",
      question_number: "Q3",
      answer: q3Answer,
    });

    // Proceed to the next page
    if(redirect)props.onSubmit(2);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={1} STEPS={STEPS} />

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
              <p className={styles.headertext}>Social</p>
              <p className={styles.subheadertext}>
                Work dignity and equal compensation
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_2.map((question, index) => {
                  return (
                    <Question
                    initial={{
                      checkbox: preload.Social[`Q${question.question_number}`].boxes,
                      sub_question : {
                        input: {
                          0 : preload.Social[`Q${question.question_number}`].description
                        }
                      }
                    }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        // Handle question 2 answers
                        if (val.question_number === "2") {
                          if (val.type === "checkbox") {
                            if (q2Answer.boxes.includes(val.value)) {
                              q2Answer.boxes.pop(val.value);
                            } else {
                              q2Answer.boxes.push(val.value);
                            }
                          }
                          else if (val.type == "input"){
                            q2Answer.description = val.value;
                          }
                        }

                        // Handle question 3 answers
                        else if (val.question_number === "3") {
                          if (val.type === "checkbox") {
                            if (q3Answer.boxes.includes(val.value)) {
                              q3Answer.boxes.pop(val.value);
                            } else {
                              q3Answer.boxes.push(val.value);
                            }
                          }

                          else if (val.type == "input"){
                            q3Answer.description = val.value;
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
            <ProgressBar progress={30} label={"Social - STEP 2"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot2;
