import { QUESTION_SET_6, STEPS } from "./constants/constants";
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

function Lot6(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [q15Answer, setq13Answer] = useState({
    ...preload.Social.Q13,
  });

  const [q16Answer, setq14Answer] = useState({
    ...preload.Social.Q14,
  });

  // Handle next page click with validation
  const handleNextPage = (redirect = true) => {
    // Validate answers

    if (q15Answer.answer1 == -1) {
      toast.error(
        "Please provide an answer for Question 15 before proceeding."
      );
      return false; // Prevent further execution if q4answer is null
    }

    if (q16Answer.answer == -1) {
      toast.error(
        "Please provide an answer for Question 16 before proceeding."
      );
      return false; // Prevent further execution if q4answer is null
    }
    if (q15Answer.answer == 1 && !q15Answer.describe) {
      toast.error("Please answer all questions for Q13.");
      return false;
    }

    if (q16Answer.answer == 1 && !q16Answer.describe) {
      toast.error("Please answer all questions for Q14.");
      return false;
    }

    addAnswer({
      type: "Social",
      question_number: "Q15",
      answer: q15Answer,
    });

    addAnswer({
      type: "Social",
      question_number: "Q16",
      answer: q16Answer,
    });

    // Go to next page
    if (redirect) props.onSubmit(5);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={1} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(4);
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
              <p className={styles.headertext}>Social</p>
              <p className={styles.subheadertext}>
                Community engagement with business partners and customers
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_6.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                          preload.Social[`Q${question.question_number}`]
                            .answer == -1
                            ? null
                            : preload.Social[`Q${question.question_number}`]
                                  .answer == 1
                              ? question.choices[0]
                              : question.choices[1],
                        input:
                          preload.Social[`Q${question.question_number}`]
                            .describe,
                      }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.question_number == "15") {
                          if (val.type == "radio") {
                            q15Answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "input") {
                            q15Answer.describe = val.value;
                          }
                        }

                        if (val.question_number == "16") {
                          if (val.type == "radio") {
                            q16Answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "input") {
                            q16Answer.describe = val.value;
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

            <ProgressBar progress={95} label={"Social - STEP 6"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot6;
