import { QUESTION_SET_7, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { Question } from "../../utilities/components/questionnaire/question/question";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import { AnswerInputField } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { useState } from "react";
import { X } from "lucide-react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { ToastContainer, toast } from "react-toastify"; // Import toast and ToastContainer

function Lot7(props) {
  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);

  const preload = useQuestionnaireStore((state) => state.answers);

  const saveQuestionnaire = useQuestionnaireStore(
    (state) => state.saveQuestionnaire
  );

  const [answer, setAnswer] = useState({
    ...preload.Governance.Q8,
  });

  const [documents, setDocuments] = useState(
    preload.Governance.Q8.sector_certificate.length > 1
      ? [
          ...preload.Governance.Q8.sector_certificate.slice(1).map((value) => {
           return {
            title: value.doc_title,
            name: value.provider_name,
            registration_number: value.reg_num,
           } 
          }
        ),
        ]
      : []
  );

  
  const [firstDoc, setFirstDoc] = useState(
    preload.Governance.Q8.sector_certificate.length > 0
      ? {
          title: preload?.Governance.Q8.sector_certificate[0]?.doc_title,
          name: preload.Governance.Q8.sector_certificate[0]?.provider_name,
          registration_number:
            preload.Governance.Q8.sector_certificate[0]?.reg_num,
        }
      : {
          title: "",
          name: "",
          registration_number: "",
        }
  );

  const handleNextPage = (redirect = true) => {
    // Validate first document fields
    if (answer.answer === -1) {
      toast.error("Please provide an answer for Question 8 before proceeding.");
      return false; // Prevent further execution if q4answer is null
    }
    if (
      answer.answer == 1 &&
      (!firstDoc.title || !firstDoc.name || !firstDoc.registration_number)
    ) {
      toast.error("Please provide all details for the first document.");
      return false;
    }

    // Handle document upload
    answer.sector_certificate = [
      {
        doc_title: firstDoc.title,
        provider_name: firstDoc.name,
        reg_num: firstDoc.registration_number,
      },
      ...documents?.map((val) => {
        return {
          doc_title: val.title,
          provider_name: val.name,
          reg_num: val.registration_number,
        };
      }),
    ];
    console.log(answer);
    addAnswer({
      type: "Governance",
      question_number: "Q8",
      answer: answer,
    });

    // Go to next page
    if (redirect) props.onSubmit(7);
  };

  const addDocument = () => {
    setDocuments([
      ...documents,
      {
        title: "",
        name: "",
        registration_number: "",
      },
    ]);
  };

  const removeDocument = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  return (
    <>
      <QuestionLayout>
        <SideStepBar activeStep={2} STEPS={STEPS} />

        <div className={styles.outer_question_container}>
          <Navbar
            onGoBack={() => {
              props.goBack(5);
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
              <p className={styles.headertext}>Governance</p>
              <p className={styles.subheadertext}>
                Data security and privacy protection
              </p>

              {/* Divider */}
              <Divider />
              {/* Questions */}
              <ul>
                {QUESTION_SET_7.map((question, index) => {
                  return (
                    <Question
                      key={`${index}-${question}`}
                      index={index}
                      initial={{
                        radio:
                          preload.Governance[`Q${question.question_number}`]?.answer === -1?null : preload.Governance[`Q${question.question_number}`]?.answer === 1
                            ? question.choices[0]
                            : question.choices[1],
                        sub_question: {
                          input: preload.Governance.Q8.sector_certificate.length > 0 ? [
                            preload.Governance.Q8.sector_certificate[0]
                              ?.doc_title,
                            preload.Governance.Q8.sector_certificate[0]
                              .provider_name,
                            preload.Governance.Q8.sector_certificate[0].reg_num,
                          ] : ["", "",""],
                        },
                      }}
                      question={question}
                      onChange={(val) => {
                        console.log(val);

                        if (val.type == "radio") {
                          setAnswer({
                            ...answer,
                            answer: val.value == "Yes" ? 1 : 0,
                          });
                        } else if (val.type == "input") {
                          if (val.label.placeholder.includes("Title")) {
                            firstDoc.title = val.value;
                          } else if (val.label.placeholder.includes("Name")) {
                            firstDoc.name = val.value;
                          } else if (
                            val.label.placeholder.includes("Registration")
                          ) {
                            firstDoc.registration_number = val.value;
                          }
                        }
                      }}
                    />
                  );
                })}
              </ul>

              <div>
                {documents?.map((doc, index) => {
                  return (
                    <div key={`document-${index}`}>
                      <p
                        style={{
                          marginTop: "15px",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "end",
                          fontSize: "14px",
                        }}
                      >
                        New Document
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                            color: "red",
                            margin: "0 5px",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            removeDocument(index);
                          }}
                        >
                          <X size={15} />
                        </button>
                      </p>
                      {Object.keys(doc).map((key, i) => {
                        return (
                          <AnswerInputField
                            key={`${index}-${i}`}
                            initial={
                              doc[key]
                            }
                            index={i}
                            option={key}
                            inputType={
                              key == "registration_number" ? "number" : "text"
                            }
                            placeholder={
                              key == "registration_number"
                                ? "Registration Number"
                                : key == "name"
                                  ? "Name of Provider"
                                  : "Title of Document"
                            }
                            selectedOption={doc[key]}
                            onChange={(value) => {
                              const newDocuments = [...documents];
                              newDocuments[index][key] = value;

                              setDocuments(newDocuments);
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "start",
                }}
              >
                <PrimaryButton
                  outlined={true}
                  hasBorder={false}
                  onClick={() => {
                    addDocument();
                  }}
                  label={"+ ADD MORE DOCUMENTS"}
                />
              </div>

              {/* Next Button */}
              <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
            </div>

            {/* Progress */}
            <ProgressBar progress={95} label={"Governance - STEP 7"} />
          </div>
        </div>
      </QuestionLayout>

      {/* Toast Container - Positioned at the bottom right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot7;
