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
import { toast, ToastContainer } from "react-toastify";


function Lot5(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [q11answer, setq11Answer] = useState({
    ...preload.Environment.Q11,
  });

  const [q12answer, setq12Answer] = useState({
    ...preload.Environment.Q12,
  });

  const handleNextPage = (redirect = true) => {
    if (q11answer.answer == -1) {
      toast.error("Please provide an answer for Question 11 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    if (q12answer.answer == -1) {
      toast.error("Please provide an answer for Question 12 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }

    addAnswer({
      type: "Environment",
      answer: q11answer,
      question_number: "Q11",
    });

    addAnswer({
      type: "Environment",
      answer: q12answer,
      question_number: "Q12",
    });
    if (redirect) props.onSubmit(0);
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(7);
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
              <p className={styles.headertext}>Environment</p>
              <p className={styles.subheadertext}>
                Waste management: Keeping products and materials in use longer,
                recycling for new products, converting into new energy
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_5.map((question, index) => {
                  return (
                    <Question
                      initial={{
                        radio:
                        preload.Environment[`Q${question.question_number}`]
                        .answer == -1 ?null :
                          preload.Environment[`Q${question.question_number}`]
                            .answer == 1
                            ? "Yes"
                            : "No",
                        input:
                          question.question_number == 12
                            ? preload.Environment.Q12.other
                            : "",
                        sub_question: {
                          checkbox_choices:
                            question.question_number == 11
                              ? preload.Environment.Q11.waste_reduction
                              : [],
                        },
                      }}
                      key={`${index}-${question}`}
                      index={index}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.question_number == "11") {
                          if (val.type == "radio") {
                            q11answer.answer = val.value == "Yes" ? 1 : 0;
                          } else if (val.type == "checkbox") {
                            if (q11answer.waste_reduction.includes(val.value)) {
                              q11answer.waste_reduction.pop(val.value);
                            } else {
                              q11answer.waste_reduction.push(val.value);
                            }
                          }
                        } else if (val.question_number == "12") {
                          if (val.type == "input") {
                            q12answer.other = val.value;
                          } else {
                            q12answer.answer = val.value == "Yes" ? 1 : 0;
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

            <ProgressBar progress={96} label={"ENVIRONMENT - STEP 9"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot5;
