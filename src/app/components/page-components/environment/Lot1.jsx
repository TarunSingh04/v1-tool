import { QUESTION_SET_1, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { Question } from "../../utilities/components/questionnaire/question/question";
import {
  PrimaryButton,
  UploadButton,
} from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import { useState } from "react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { toast, ToastContainer } from "react-toastify";




function Lot1(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);
  const preload = useQuestionnaireStore((state) => state.answers);
  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);
  
  const [answer, setAnswer] = useState({
    ...preload.Environment.Q1
  });

  console.log("preload");
  console.log(preload);

  const handleNextPage = (redirect = true) => {
    if (answer.answer == -1){
      toast.error("Please Choose an option");
      return false;
    }
    addAnswer({
      type: "Environment",
      question_number: "Q1",
      answer: answer,
    });
    if(redirect){
      props.onSubmit(1);
    }
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={0} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            backDisabled={true}
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
                Your carbon footprint and sustainability certificates
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}

              {QUESTION_SET_1.map((question, index) => {
                return (
                  <Question
                    initial={{
                      radio: preload.Environment.Q1.answer == 1 ? "Yes" : preload.Environment.Q1.answer == 0 ? "No" : undefined,
                      input: preload.Environment.Q1.date
                    }}
                    key={`${index}-${question}`}
                    index={index}
                    question={question}
                    onChange={(val) => {
                      setAnswer((prev) => {
                        let updatedAnswer = { ...prev };
                        if (val.type === "radio") {
                          updatedAnswer.answer = val.value === "No" ? 0 : 1;
                          if (val.value === "No") updatedAnswer.date = "";
                        } else if (val.type === "date") {
                          updatedAnswer.date = val.value || "";
                        }
                        return updatedAnswer;
                      });
                    }}
                  />
                );
              })}

              {/* Next Button */}
              <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
            </div>

            {/* Progress */}

            <ProgressBar progress={12} label={"ENVIRONMENT - STEP 1"} />
          </div>
        </div>
      </QuestionLayout>
      <ToastContainer position="bottom-right"/>
    </>
  );
}

export default Lot1;
