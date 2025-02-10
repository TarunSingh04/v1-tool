import { QUESTION_SET_1, STEPS } from "./constants/constants";
import styles from "./styles.module.scss";
import { PrimaryButton } from "../../utilities/components/questionnaire/buttons/buttons";
import { Navbar } from "../../utilities/components/questionnaire/nav/nav";
import {
  ProgressBar,
  SideStepBar,
} from "../../utilities/components/questionnaire/progressbar/progressbar";
import { QuestionLayout } from "../../utilities/components/questionnaire/layout/layout";
import Divider from "../../utilities/components/questionnaire/divider/divider";
import { SearchableDropdown } from "../../utilities/components/questionnaire/inputfields/inputfields";
import { SkipForward } from "lucide-react";
import { useState } from "react";
import useQuestionnaireStore from "../../store/questionnaireStore";
import { ToastContainer, toast } from "react-toastify"; // Importing toast and ToastContainer
import { useRouter } from "next/navigation";


function Lot1(props) {
  const preload = useQuestionnaireStore((state) => state.answers);

  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState(preload.sdg.Q1? preload.sdg.Q1.map((val)=>val.Sdgname) : []);
  const [showTextFields, setShowTextFields] = useState(!preload.sdg.Q1.isEmpty ? true : false);

  const addAnswer = useQuestionnaireStore((state) => state.addAnswer);
  const saveQuestionnaire = useQuestionnaireStore((state) => state.saveQuestionnaire);
  const submitQuestionnaire = useQuestionnaireStore((state) => state.submitQuestionnaire);

  const [isLoading, setIsLoading] = useState(false);
  
  console.log(selectedOptions);

  const handleNextPage = (redirect = true) => {
    // Validation: Ensure at least one option is selected
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one SDG to proceed.");
      return false;
    }

    addAnswer({
      type: "sdg",
      question_number: "Q1",
      answer: selectedOptions.map((val) => {
        return {
          "Sdgname" : val,
          "Description" : preload.sdg.Q1.find((value)=>value.Sdgname == val).Description,
        }
      }),
    });

    if(redirect)props.onSubmit(1);
  };

  const handleSkip = ()=>{
    setIsLoading(true);
    setTimeout(()=>{
    saveQuestionnaire();
    submitQuestionnaire();
    setIsLoading(true);
    router.push("/pages/dashboard");
    }, 1000);
  }
  return (
    <>
      {isLoading && (
        <div className={styles.container}>
          <div className={styles.loader}></div>
        </div>
      )}
      <QuestionLayout>
        <SideStepBar activeStep={3} STEPS={STEPS} />

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
              //router.push("/pages/dashboard");
            }}
          />

          <div className={styles.question_container}>
            <div>
              <p className={styles.headertext}>Sustainable development goals</p>
              <p className={styles.subheadertext}>
                Please provide detailed information about your company&apos;s SDG
              </p>
              <p className={styles.subheadertext} style={{ borderLeft: "none", marginLeft: "2px" }}>
                For more details on SDGs{" "}
                <a
                  href="https://www.un.org/sustainabledevelopment/news/communications-material/"
                  style={{ color: "blue", textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Click Here
                </a>
              </p>

              {/* Divider */}
              <Divider />
              {/* Question */}
              <SearchableDropdown
                options={QUESTION_SET_1.choices}
                sdgImages={QUESTION_SET_1.images}
                isSDG={true}
                initial={preload.sdg.Q1.map((val)=>val.Sdgname)}
                onChange={(options) => {
                  setSelectedOptions(options);

                  if (options.length === 0) {
                    setShowTextFields(false);
                  }
                }}
                onClick={() => {
                  if (selectedOptions.length > 0) {
                    setShowTextFields(true);
                  }
                }}
              />

              {/* Next Button */}
              {showTextFields && (
                <PrimaryButton onClick={handleNextPage} label={"NEXT PAGE"} />
              )}

              {/* GAP */}
              <div style={{ height: "5px" }}></div>

              {/* Skip */}
              <PrimaryButton
                outlined={true}
                onClick={handleSkip}
                label={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      verticalAlign: "middle",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      SKIP STEP
                    </p>{" "}
                    <span style={{ marginLeft: "5px" }}>
                      <SkipForward size={16} />
                    </span>
                  </div>
                }
              />
            </div>

            {/* Progress */}
            <ProgressBar progress={30} label={"Sustainable development goals - STEP 1"} />
          </div>
        </div>
      </QuestionLayout>

      {/* Toast Container - Positioned at the bottom right */}
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Lot1;
