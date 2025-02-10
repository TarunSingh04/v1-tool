export const QUESTION_SET_1 = [
  {
    question_number: "1",
    question:
      "What do you include in the range of compensations you offer your employees? (Check all relevant boxes)",
    text_labels: [],
    choices: [
      "Bonuses: Performance-based bonuses, sign-on bonuses, referral bonuses, holiday bonuses.",
      "Profit-sharing: Distribution of a percentage of company profits to employees.",
      "Stock options: The right to purchase company shares at a predetermined price.",
      "Commission: Percentage-based rewards for sales or services rendered.",
      "Tuition reimbursement: Financial assistance for employees' education or training.",
    ],
    sub_questions: [
      {
        question: "Other financial compensations",
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
    choice_type: "checkbox",
    has_file: false,
  },
];

export const QUESTION_SET_2 = [
  {
    question_number: "2",
    question:
      "What lifestyle benefits do you offer as part of employee compensation? (Check all relevant boxes)",
    text_labels: [],
    choices: [
      "Flexible working hours: Ability to adjust work schedule for better work-life balance.",
      "Remote work options: Working from home or other locations outside the traditional office.",
      "Gym memberships or wellness programs: Subsidised or free access to fitness facilities or health initiatives.",
      "Commission: Percentage-based rewards for sales or services rendered.",
      "Childcare support: On-site childcare facilities, financial assistance for childcare expenses.",
      "Employee discounts: Reduced prices on company products or services, or partner offerings.",
      "Meal vouchers or subsidised meals: Discounted or free meals at company cafeterias or restaurants.",
      "Company-sponsored events: Social gatherings, team-building activities, or holiday parties.",
      "Relocation assistance: Support for employees moving for work purposes.",
    ],
    sub_questions: [
      {
        question: "Other lifestyle benefits.",
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
    choice_type: "checkbox",
    has_file: false,
  },
  {
    question_number: "3",
    question:
      "What other benefits for compensation do you offer (check all irrelevant boxes):",
    text_labels: [],
    choice_type: "checkbox",
    has_file: false,
    choices: [
      "Disability insurance: Coverage for income loss due to illness or injury.",
      "Life insurance: Payment to beneficiaries upon an employee's death.",
      "Employee assistance programs (EAPs): Confidential counseling or support services for personal or work-related issues.",
      "Professional development opportunities: Conferences, training courses, or mentorship programs.",
      "Sabbaticals or paid leave for personal projects: Extended periods of paid leave for personal or professional growth.",
      "Commuter benefits: Subsidized public transportation passes, parking, or company shuttles.",
    ],
    sub_questions: [
      {
        question: "Other financial compensations",
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
  },
  // {
  //     "question": "Other Benefits for Compensation:",
  //     "text_labels": [],
  //     "choices": [
  //         "Disability insurance: Coverage for income loss due to illness or injury.",
  //         "Life insurance: Payment to beneficiaries upon an employee's death.",
  //         "Employee assistance programs (EAPs): Confidential counseling or support services for personal or work-related issues.",
  //         "Professional development opportunities: Conferences, training courses, or mentorship programs.",
  //         "Sabbaticals or paid leave for personal projects: Extended periods of paid leave for personal or professional growth.",
  //         "Commuter benefits: Subsidized public transportation passes, parking, or company shuttles.",
  //         "Other financial compensations."
  //     ],
  //     "choice_type": "checkbox",
  //     "has_file": false,
  // }
];

export const QUESTION_SET_3 = [
  {
    question_number: "4",
    question:
      "Collective bargaining with trade unions: Is the level and scope of your employees’ compensation (wages and non-wage compensation benefits) in line with local union demands?",
    text_labels: [],
    choices: ["Yes", "No", "Not applicable (no trade union)"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "5",
    question:
      "Gender parity: Equal compensation for equal work is the goal to achieve gender parity. How far is your company from achieving that goal? (Check the appropriate box and provide % as needed)",
    text_labels: [
    ],
    choices: [
      "Women and men are compensated equally for equal work",
      "Some women are compensated at the same level as men for equal work",
      "No woman is compensated at the same level as men for equal work",
    ],
    choices_sub_questions: [
      {
        index: 1,
        questions: [
          {
            question:
              "% of women so compensated out of the total female workforce",
            has_input: true,
            input_type: "number",
          },
          {
            question:
              "% of women at C-level (managers) out of total at that level",
            has_input: true,
            input_type: "number",
          },
        ],
      },
    ],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "6",
    question:
      "Immigrants/vulnerable groups: Equal compensation for equal work is the goal to achieve full integration for immigrants and vulnerable groups. How far is your company from achieving that goal? (Check the appropriate box and provide % as needed)",
    text_labels: [
      
    ],
    choices: [
      "Immigrants/vulnerable groups are compensated equally for equal work",
      "Some immigrants/vulnerable groups are compensated at the same level for equal work",
      "No immigrants/vulnerable groups are compensated at the same level for equal work",
    ],
    choice_sub_question: [
      {
        question: "% of women so compensated out of the total female workforce",
        is_horizontal: true,
        has_input: true,
        text_labels: [],
        choices: [],
        input_orientation: "horizontal",
        activate_on: "select", // select, always
      },
      {
        question: "% of women at C-level (managers) out of total at that level",
        input_orientation: "horizontal",
        is_horizontal: true,
        has_input: true,
        text_labels: [],
        choices: [],
        activate_on: "select", // select, always
      },
    ],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "7",
    question:
      "Work stability: Does full-time vs. part-time employment and/or permanent vs. temporary staff positions entail a change in compensation level, i.e. lower for part-time or temporary work as compared to full-time or permanent?",
    choices: ["Yes, It is Lower", "No, It is at the same level"],
    choice_type: "radio",
    text_labels: [],
  },
];

export const QUESTION_SET_4 = [
  {
    question_number: "8",
    question: "Persons with disabilities:",
    text_labels: [],
    choices: [],
    sub_questions: [
      {
        text_labels: [],
        question:
          "Is increasing % of persons with disabilities a goal for your company?",
        choices: ["Yes", "No"],
        choice_type: "radio",
        has_file: false,
      },
      {
        text_labels: [],
        question:
          "Persons with disabilities are compensated at the same level for equal work (in answering, please take into account the eventual contribution from governmental schemes designed to support the reintegration of vulnerable groups)?",
        choices: ["Yes", "No"],
        choice_type: "radio",
        has_file: false,
      },
    ],
  },
  {
    question_number: "9",
    question: "Opportunities for Professional Growth",
    text_labels: [],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
    sub_questions: [
      {
        question: "Check all appropriate boxes:",
        choices: [
          "Individual professional training",
          "Staff reunions/ group training",
          "Other",
        ],
        text_labels: [
          {
            label: "",
            placeholder: "Describe other professional growth opportunities",
          },
        ],
        choice_type: "checkbox",
        has_file: false,
      },
    ],
  },
];

export const QUESTION_SET_5 = [
  {
    question_number: "10",
    question: "Flexible working time: Do you provide it?",
    text_labels: [],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "11",
    question:
      "Safety and health measures: Do you have obtained a certificate to prove you have such measures in place to protect your employees?",
    text_labels: [
      {
        label: "",
        placeholder: "If yes, please give name",
      },
      {
        label: "",
        placeholder: "If yes, please give number",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "12",
    question:
      "If you have no certificates or the certificates you hold are not either based on ISO 45001 or SO8000, do you have any safety and/or health measures in place for your employees?",
    text_labels: [
      {
        label: "",
        placeholder:
          "If yes, briefly describe your employee safety and/or health measures:",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "13",
    question:
      "Worker family health requirements (e.g., for mothers and fathers at the moment of birth, care for the sickness of a close relative): Do you have measures in place to respond to the health needs of your employees or their immediate family (children or parent) that are additional to what is required by law in your country?",
    text_labels: [
      {
        label: "",
        placeholder: "If yes, explain briefly what measures",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "14",
    question:
      "Measures against violence and sexual harassment in the workplace: Have you put in place measures to address this issue that are additional to what is required by law in your country?",
    text_labels: [
      {
        label: "",
        placeholder:
          "If yes, briefly describe the measures against violence and sexual harassment that you have in place",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
];

export const QUESTION_SET_6 = [
  {
    question_number: "15",
    question:
      "Do you engage in Product Stewardship to promote the circular economy, such as, for example, participating in Extended Producer Responsibility (EPR) programmes (EPR means that producers are held to be financially responsible for the collection and recycling of their products at the end of their lifespan)?",
    text_labels: [
      {
        label: "",
        placeholder: "If yes, briefly indicate in what programme",
      },
    ],
    choices: ["Yes", "No"],
    choice_type: "radio",
    has_file: false,
  },
  {
    question_number: "16",
    question: "Do you participate in local community partnerships?",
    text_labels: [
      {
        label: "",
        placeholder: "If yes, please describe your answer here",
      },
    ],
    choices: ["Yes", "No"],
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
