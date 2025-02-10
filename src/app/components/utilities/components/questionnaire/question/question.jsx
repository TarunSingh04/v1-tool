import styles from "./question.module.scss";
import { useState } from "react";
import {
  AnswerInputField,
  AnswerRadioButtonField,
  AnswerCheckboxField,
  PercentageInputField,
} from "../inputfields/inputfields";
import { UploadButton } from "../buttons/buttons";
import { SquareArrowOutUpRight } from "lucide-react";

export const SubQuestion = ({
  index,
  question,

  onChange,
  initial,
  inputType = "text",
}) => {
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? initial
        ? initial.radio_choices
          ? initial.radio_choices[index]
          : initial.radio
        : null
      : initial
        ? initial.checkbox_choices && initial.checkbox_choices != []
          ? initial.checkbox_choices
          : initial.checkbox
            ? initial.checkbox
            : Array(question.choices.length).fill(false)
        : Array(question.choices.length).fill(false)
  );
  const [isChecked, setIsChecked] = useState(initial && initial.checked ? initial.checked[index] ?? false : false);

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };


  return (
    <>
      <div key={`${index}:questions`}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            padding: !question.question.includes("Other")
              ? "10px 5px"
              : "10px 5px",
            marginBottom: "-5px",
            marginTop: !question.question.includes("Other") ? "15px" : "0",
            borderRadius: "10px",
            backgroundColor:
              question.question_type == "checkbox" &&
              !question.question.includes("Other")
                ? "#fafafa"
                : "transparent",
          }}
        >
          {question.question_type == "checkbox" && (
            <input
              style={{
                marginRight: "5px",
              }}
              type="checkbox"
              checked={isChecked}
              value={question}
              onChange={(e) => {
                setIsChecked(!isChecked);

                onChange({
                  type: "checkbox",
                  value: question.question,
                });
              }}
            />
          )}
          <p className={styles.subquestiontext}>{question.question}</p>
        </div>

        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  hasInputBox={question.has_input}
                  key={`${choiceIndex}:sub_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);

                    onChange({
                      type: "radio",
                      label: question.question,
                      question_number: question.question_number,
                      value: option,
                    });
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField
                  hasInputBox={question.has_input}
                  initial={
                    initial && initial.choice_input
                      ? initial.choice_input[choiceIndex]
                      : ""
                  }
                  key={`${choiceIndex}:sub_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onInputChange={(val) => {
                    onChange({
                      type: "sub_input",
                      for: option,
                      value: val,
                    });
                  }}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                    onChange({
                      type: "checkbox",
                      label: question,

                      question_number: question.question_number,
                      value: option,
                    });
                  }}
                />
              );
            }
          })}
        </div>

        {/* File */}

        {/* Input Field */}
        {question.text_labels.map((text_label, labelIndex) => {
          return (
            <AnswerInputField
              large={text_label.large ?? false}
              key={`${labelIndex}:sub_text_label`}
              index={labelIndex}
              initial={
                initial && initial.input
                  ? (typeof initial.input == "string" ?  initial.input : initial.input[labelIndex])
                  : null
              }
              inputType={text_label.input_type ? text_label.input_type : "text"}
              label={text_label.label}
              placeholder={text_label.placeholder}
              onChange={(text) => {
                onChange({
                  type: "input",
                  label: text_label,

                  question_number: question.question_number,
                  value: text,
                });
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export const Question = ({
  index,
  question,
  onChange,
  initial = null,
  questionBottomWidget = null,
}) => {
  
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? initial && initial.radio
        ? initial.radio
        : null
      : initial && initial.checkbox
        ? initial.checkbox
        : Array(question.choices.length).fill(false)
  );

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };

  return (
    <>
      <div key={`${index}:questions`}>
        <ol>
          <li
            value={question.question_number}
            style={{
              fontWeight: "600",
            }}
          >
            {" "}
            <p className={styles.questiontext}>{question.question}</p>
          </li>
        </ol>
        {questionBottomWidget}
        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  bottomWidget={
                    question.choices_sub_questions &&
                    question.choices_sub_questions.map((value, subIndex) => {
                      if (value.index == choiceIndex) {
                        return (
                          <>
                            {
                              // {
                              //   question:
                              //     "% of women so compensated out of the total female workforce",
                              //   has_input: true,
                              //   input_type: "number",
                              // },
                              value.questions.map((q, index) => {
                                return (
                                  <div
                                    key={`choice_sub_question:${index}`}
                                    className={styles.row_between}
                                    sty
                                  >
                                    <p
                                      className={styles.optiontext}
                                      style={{
                                        minWidth: "100px",
                                      }}
                                    >
                                      {q.question}
                                    </p>

                                    <PercentageInputField
                                      initial={
                                        initial.choices_sub_question.input[
                                          subIndex
                                        ]
                                      }
                                      onChange={(val) => {
                                        onChange({
                                          type: "input",
                                          value: val,
                                          label: q,
                                          question_number:
                                            question.question_number,
                                        });
                                      }}
                                    />
                                  </div>
                                );
                              })
                            }
                          </>
                        );
                      }
                    })
                  }
                  key={`${choiceIndex}:r_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                    onChange({
                      type: "radio",
                      label: question.question,
                      question_number: question.question_number,
                      value: option,
                    });
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField
                  key={`${choiceIndex}:c_question_choices`}
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                    onChange({
                      type: "checkbox",
                      label: question.question,
                      question_number: question.question_number,
                      value: option,
                    });
                  }}
                  onInputChange={(val) => {
                    onChange({
                      type: "sub_input",
                      for: option,
                      label: question.question,
                      question_number: question.question_number,
                      value: val,
                    });
                  }}
                />
              );
            }
          })}
        </div>

        {/* Sub Question*/}
        {question.has_condition &&
        (selectedOption == "No" ||
          selectedOption == "Don't know" ||
          !selectedOption) ? (
          <></>
        ) : question.sub_questions ? (
          question.sub_questions.map((sub_question, subIndex) => {
            return (
              <SubQuestion
                initial={initial ? initial.sub_question : null}
                key={`${subIndex}-${sub_question}`}
                index={subIndex}
                question={sub_question}
                onChange={(val) => {
                  onChange({
                    ...val,
                    question_number: question.question_number,
                  });
                }}
              />
            );
          })
        ) : null}

        {/* Input Field */}
        {question.has_condition &&
        (selectedOption == "No" ||
          selectedOption == "Don't know" ||
          !selectedOption) ? (
          <></>
        ) : (
          question.text_labels.map((text_label, labelIndex) => {
            return (
              <AnswerInputField
                key={`${labelIndex}:text_label`}
                inputType={
                  text_label.input_type ? text_label.input_type : "text"
                }
                initial={initial && initial.input? typeof initial.input == 'string' ? initial.input : initial.input[labelIndex] : null}
                large={text_label.large}
                index={labelIndex}
                label={text_label.label}
                placeholder={text_label.placeholder}
                onChange={(text) => {
                  onChange({
                    type: text_label.is_date ? "date" : "input",
                    label: text_label,
                    question_number: question.question_number,
                    value: text,
                  });
                }}
              />
            );
          })
        )}

        {/* File */}
        {(question.show_on_no == undefined || question.show_on_no == true) &&
        question.has_condition &&
        selectedOption ? (
          selectedOption == "Yes" ? (
            question.has_file ? (
              <UploadButton label={"Upload your GHG Emissions report here"} />
            ) : (
              <></>
            )
          ) : (
            <div
              style={{
                backgroundColor: "#F9FAFC",
                borderRadius: "5px",
                fontSize: "14px",
                fontWeight: "500",
                minHeight: "140px",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                margin: "10px 0",
              }}
            >
              <p>Get Your GHG emission certificate</p>

              <a
                className={styles.link}
                href="https://businessclimatehub.uk"
                target="_blank"
              >
                businessclimatehub.uk
                <SquareArrowOutUpRight size={15} />
              </a>
              <a
                className={styles.link}
                href="https://www.clustercollaboration.eu/"
                target="_blank"
              >
                clustercollaboration.eu
                <SquareArrowOutUpRight size={15} />
              </a>
              <a
                className={styles.link}
                href="https://smeclimatehub.org/"
                target="_blank"
              >
                smeclimatehub.org
                <SquareArrowOutUpRight size={15} />
              </a>
            </div>
          )
        ) : null}
      </div>
    </>
  );
};
