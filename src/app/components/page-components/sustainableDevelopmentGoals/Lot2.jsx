"use client";

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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { ToastContainer, toast } from "react-toastify"; // Importing toast and ToastContainer

function Lot2(props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);
  const preload = useQuestionnaireStore((state) => state.answers);
  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const submitQuestionnaire = useQuestionnaireStore(
    (state) => state.submitQuestionnaire
  );

  const [answer, setAnswer] = useState(preload.sdg.Q1 ? {
    ...preload.sdg.Q1.map((val, i) => {
      return val.Description;
    }),
  }: {
  });
  console.log("Preload");
  console.log(preload.sdg);
  const validateAndSubmit = (redirect = true) => {
    // Validation: Ensure all questions have answers
    let values = Object.values(answer);

    for (let value of values) {
      if (!value) {
        toast.error("Please provide answers for all questions.");
        return false;
      }
    }

    // If valid, save the answers and proceed
    const data = preload.sdg.Q1.map((val, index) => ({
      Sdgname: val.Sdgname,
      Description: answer[index],
    }));

    console.log(data);

    addAnswer({
      type: "sdg",
      question_number: "Q1",
      answer: data,
    });

    saveQuestionnaire();

    if (redirect){
    setIsLoading(true);
    setTimeout(() => {
       {
        console.log("Submitting");
        submitQuestionnaire();
      }
      router.push("/pages/dashboard");
      setIsLoading(false);
    }, 1000);
    }
  };

  return (
    <>
      (
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
        </div>
      )}
      ): (
      <>
        <QuestionLayout>
          <SideStepBar activeStep={3} STEPS={STEPS} />

          <div className={styles.outer_question_container}>
            <Navbar
              onGoBack={() => {
                props.goBack(0);
              }}
              onSave={() => {
                validateAndSubmit(false);
              }}
            />

            <div className={styles.question_container}>
              <div>
                <p className={styles.headertext}>
                  Sustainable Development Goals
                </p>
                <p className={styles.subheadertext}>
                  Please provide detailed information about your company&apos;s
                  SDG
                </p>
                <p className={styles.subheadertext}>
                  For more details on SDGs{" "}
                  <a href="#" style={{ color: "blue", textDecoration: "none" }}>
                    Click Here
                  </a>
                </p>

                {/* Divider */}
                <Divider />

                {/* Questions */}
                <ul>
                  {preload.sdg.Q1.map((val, index) => {
                    return {
                      question: val.Sdgname,
                      description: val.Description,
                      question_number: index + 1,
                      choices: [],
                      choice_type: "radio",
                      has_file: false,
                      text_labels: [
                        {
                          placeholder: "Enter details here",
                          label: "",
                          large: true,
                        },
                      ],
                    };
                  }).map((question, index) => {
                    console.log(question);
                    return (
                      <Question
                        key={`${index}-${question}`}
                        index={index}
                        question={question}
                        initial={
                          {
                            input: question.description
                          }
                        }
                        onChange={(val) => {
                          console.log(val);
                          if (val.type === "input") {
                            const updatedAnswer = answer;
                            updatedAnswer[val.question_number - 1] = val.value;
                            setAnswer(updatedAnswer);
                          }
                        }}
                      />
                    );
                  })}
                </ul>

                {/* Submit Button */}
                <PrimaryButton onClick={validateAndSubmit} label={"Submit"} />
              </div>

              {/* Progress */}
              <ProgressBar
                progress={90}
                label={"Sustainable Development Goals - STEP 2"}
              />
            </div>
          </div>
        </QuestionLayout>
      </>
      ){/* Toast Container - Positioned at the bottom right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot2;
