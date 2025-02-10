import EuLabelWidget from "../widgets/EuLabelWidget.jsx";

export const QUESTION_SET_1 = [
  {
    question_number: "1",
    question:
      "Have you obtained a measure of your GHG emissions (scope 1, 2) to assess the carbon footprint resulting from your activities?",
    text_labels: [
      {
        label: "Date Obtained",
        placeholder: "MM/DD/YYYY",
        is_date: true,
        input_type: "date",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: true,
    has_condition: true,
  },
];

export const QUESTION_SET_2 = {
  choices: [
    "Utility details 1",

    "Utility details 2",

    "Utility details 3",

    "Utility details 4",

    "Utility details 5",

    "Utility details 6",
  ],
};

export const QUESTION_SET_2A = [
  {
    question_number: "3",
    question: "Do you use any renewable energy sources?",
    has_condition: true,
    show_on_no: false,
    text_labels: [],
    sub_questions: [
      {
        question:
          "Please indicate your sources, click every box that applies and provide the percentage (%) of the total energy you received from that source:",
        choices: ["Solar Panels", "Wind Power", "Biofuels", "Hydropower"],
        choice_type: "checkbox",
        has_input: true,
        text_labels: [],
      },
    ],

    choices: [
      "Yes - Please indicate your sources, click every box that applies & provide the percentage (%)  of the total energy you received from that source",
      "No",
    ],
    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_3 = [
  {
    question_number: "4",
    questionBottomWidget: <EuLabelWidget />,
    question:
      "Have you obtained an EU energy efficiency label for any part or the whole of the products you provide and/or the infrastructure or properties you operate in:",
    text_labels: [],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
    has_condition: true,
    sub_questions: [
      {
        question: "Covers less than 50%",
        text_labels: [],
        choices: ["A", "B", "C", "D", "E", "F", "G"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
      {
        question: "Covers from 50% to 80%",
        text_labels: [],
        choices: ["A", "B", "C", "D", "E", "F", "G"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
      {
        question: "Covers over 80%",
        text_labels: [],
        choices: ["A", "B", "C", "D", "E", "F", "G"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
    ],
  },

  {
    question:
      "If you haven’t yet obtained any label for energy efficiency or if you plan to improve your level of efficiency to obtain a higher label, will you carry out an energy audit and implement measures to improve energy efficiency within the next 24 months",
    question_number: "5",
    text_labels: [],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_4 = [
  {
    question: "Indicate the name of your water utility provider:",
    question_number: "6",
    text_labels: [
      {
        label: "",
        placeholder: "Enter Name Here",
      },
    ],
    choices: [],

    choice_type: "radio",
    has_file: false,
  },
  {
    question:
      "Indicate the name of your wastewater utility (Sewer department or sanitation service overseeing your wastewater disposal)",
    question_number: "7",
    text_labels: [
      {
        label: "",
        placeholder: "Please Enter Name",
      },
    ],
    has_condition: true,
    show_on_no: false,
    choices: ["Yes", "No", "Don't know"],

    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_4A = [
  {
    question:
      "Alternative water sources: If you use one or more alternative water sources please fill out the table below (check as many as appropriate), giving the percentage of your total water consumption provided by this source and rating its water quality (insufficient, sufficient and good) :",
    question_number: "8",
    text_labels: [],
    sub_questions: [
      {
        question:
          "Alternative water sources: check appropriate boxes for the source(s) you use; leave blank those you do not use",
        text_labels: [],
        choices: [
          "Harvested rainwater (collected from roofs or other surfaces)",
          "Reclaimed wastewater (such as from sinks, showers, and industrial processes)",
          "Greywater (treated and reused for non-potable purposes like toilet flushing or irrigation)",
          "Captured condensate (from air-conditioning units or coils)",
          "Desalinated water (Conversion of seawater into freshwater)",
          "Process re-use (eg: water used in one manufacturing process is reused in another)",
          "Others",
        ],
        has_input: true,
        choice_type: "checkbox",
      },
    ],
    choices: [],

    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_4B = [
  {
    question:
      "Have you found wastewater discharge issues caused by chemical pollutants and/or plastics:",
    question_number: "9",
    choices: [
      "No",
      "Yes - please indicate what pollution prevention method you use (tick all boxes that apply) and rate the method’s usefulness (good = the method solves the problem; sufficient = not perfect but acceptable; insufficient = does not work, more needs to be done)",
    ],
    sub_questions: [
      {
        question:
          "Pollution prevention method adopted to address discharge issues (check appropriate boxes for the methods you use; leave blank those you do not use)",
        choices: [],
        text_labels: [],
        choice_type: "",
        has_file: false,
      },
      {
        question:
          "Pre-treatment systems (eg, filters, screens, and clarifiers)",
        question_type: "checkbox",
        text_labels: [],
        choices: ["Yes", "No"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
      {
        question:
          "Wastewater treatment: biological processes, chemical treatment, or a combination of both",
        question_type: "checkbox",
        text_labels: [],
        choices: ["Yes", "No"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
      {
        question: "Microplastics filtration",
        question_type: "checkbox",
        text_labels: [],
        choices: ["Yes", "No"],
        choice_orientation: "horizontal",
        choice_type: "radio",
        has_file: false,
      },
      {
        question: "Others",
        question_type: "checkbox",

        text_labels: [
          {
            label: "",
            placeholder: "Please Specify",
            type: "text",
            large: true,
          },
        ],
        choices: [],
        choice_type: "",
        has_file: false,
      },
    ],
    text_labels: [],
    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_4C = [
  {
    question_number:"10",
    question:
      "Pollution prevention or reduction through production process modification:",
    choices: [
        "Using less hazardous chemicals and/or material substitution",
        "Optimising water usage",
        "Implementing closed-loop systems that recycle water within the business",
        "Others"
    ],
    text_labels: [],
    choice_type: "checkbox",
    has_file: false,
  },
];

export const QUESTION_SET_5 = [
  {
    question: "Are you actively engaged in waste reduction:",
    question_number: "11",
    text_labels: [],
    choices: ["Yes", "No"],
    sub_questions: [
      {
        question:
          "Please indicate how you have achieved waste reduction (check all of the following methods you use):",
        text_labels: [],
        choices: [
          "Product redesign for reuse/remanufacturing (i.e. closed loop system)",
          "Organic waste processed for composting",
          "Re-using construction debris for new products",
          "Using alternative materials, promoting recycling, and designing products for circularity",
          "Contributing your organic waste to a plant that extracts energy",
        ],
        choice_orientation: "vertical",
        choice_type: "checkbox",
      },
    ],
    choice_orientation: "vertical",
    choice_type: "radio",
    has_file: false,
  },
  {
    question:
      "Are you partnering with businesses or manufacturers to create products that are easy to, disassemble, repair and reuse ensuring second hand terms can be solid instead of ending up in landfills?",
    question_number: "12",
    text_labels: [
      {
        label: "",
        placeholder:
          "If desired, give one or more example(s) of successful partnership(s) you have achieved:",
        type: "text",
      },
    ],
    choices: ["Yes", "No"],
    choice_orientation: "vertical",

    choice_type: "radio",
    has_file: false,
  },
];

export const STEPS = [
  {
    heading: "Environmental",
    sub_heading: "Sample Text",
  },
  {
    heading: "Social",
    sub_heading: "Sample Text",
  },
  {
    heading: "Governance",
    sub_heading: "Sample Text",
  },
  {
    heading: "Sustainable Development Goals",
    sub_heading: "Sample Text",
  },
];
