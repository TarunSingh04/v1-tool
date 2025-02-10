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
import { toast, ToastContainer } from "react-toastify";

function Lot2(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
    ...preload.Governance.Q2,
  });

  const handleNextPage = (redirect = true) => {
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 2 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    // Submit the answers
    addAnswer({
      type: "Governance",
      question_number: "Q2",
      answer: answer,
    });

    // Go to next page
    if (redirect) props.onSubmit(2);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(0);
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
              <p className={styles.headertext}>Governance</p>
              <p className={styles.subheadertext}>
                Ethical fund-raising and charitable activities
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_2.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                          preload.Governance[`Q${question.question_number}`]
                            ?.answer === -1
                            ? null
                            : preload.Governance[`Q${question.question_number}`]
                                  ?.answer === 1
                              ? question.choices[0]
                              : question.choices[1],
                      }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.type == "radio") {
                          answer.answer = val.value == "Yes" ? 1 : 0;
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

            <ProgressBar progress={20} label={"Governance - STEP 2"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
      
    </>
  );
}

export default Lot2;
