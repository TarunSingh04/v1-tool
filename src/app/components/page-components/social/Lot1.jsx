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
import { toast, ToastContainer } from "react-toastify"; // Importing toast for error notifications

function Lot1(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
    ...preload.Social.Q1,
  });

  // Function to handle form submission and validation
  const handleNextPage = (redirect = true) => {
    // Check if at least one checkbox is selected
    if (answer.boxes.length === 0) {
      toast.error("Please select at least one option.");
      return false;  // Prevent submission if no checkboxes are selected
    }

   

    // Add answer to the store
    addAnswer({
      type: "Social",
      question_number: "Q1",
      answer: answer,
    });

    // Proceed to the next page
    if(redirect)props.onSubmit(1);
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
              {QUESTION_SET_1.map((question, index) => {
                return (
                  <Question
                    initial={{
                      checkbox: preload.Social.Q1.boxes,
                      sub_question: {
                        checked:[
                          preload.Social.Q1.boxes.includes("Other financial compensations") ? true : false
                        ],
                        input: preload.Social.Q1.description
                      }
                      
                    }}
                    key={`${index}-${question}`}
                    index={index}
                    question={question}
                    onChange={(val) => {
                      console.log(val);

                      if (val.type === "checkbox") {
                        if (answer.boxes.includes(val.value)) {
                          answer.boxes.pop(val.value);
                        } else {
                          answer.boxes.push(val.value);
                        }
                      } else if (val.type === "input") {
                        answer.description = val.value;
                      }
                    }}
                  />
                );
              })}

              {/* Next Button */}
              <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
            </div>

            {/* Progress */}
            <ProgressBar progress={10} label={"Social - STEP 1"} />
          </div>
        </div>
      </QuestionLayout>

      {/* ToastContainer for displaying the toasts at the bottom-right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot1;
