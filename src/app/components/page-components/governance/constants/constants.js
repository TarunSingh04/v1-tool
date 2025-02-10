export const QUESTION_SET_1 = [
    {
        "question_number": "1",
        "question": "Do you follow the ISO 37001 principles and criteria for anti-fraud and anti-money laundering activities and have you obtained certification demonstrating that you do so?",
        "choices": [
            "Yes",
            "No"
        ],
        "text_labels": [],

        "choice_type": "radio",
        "has_file": false,
        "sub_questions": [
            {
                "question": "If yes, give name of the certification body that provided you with the certification and year obtained:",
                "choices": [],
                "text_labels": [
                    {
                        "label": "",
                        "placeholder": "Name of the certification body"
                    },
                    {
                        "label": "",
                        "placeholder": "Year obtained",
                        "input_type": "number",
                        "max": "8000"
                    }
                ]
            }
        ]
    }
];


export const QUESTION_SET_2 = [
    {
        "question_number": "2",
        "question": "Are you already following the general ethical principles set by organisations like the European Fundraising Association (EFA) that are focused on transparency, accountability, and fair tax treatment of charities?",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
    }
];

export const QUESTION_SET_3 = [
    {
        "question_number": "3",
        "question": "Do you offer to your customers a carbon credit or offset scheme or other form of compensation for CO2 emissions?",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": [
            {
                "question": "Please indicate which scheme or compensation package you use:",
                "text_labels": [
                    {
                        "label": "",
                        "placeholder": "Enter details here"
                    }
                ],
                "choices": [],
            }
        ]
    }
];



export const QUESTION_SET_4 = [
    {
        "question_number": "4",
        "question": "Have you considered taking measures for improved quality management, a cornerstone of several aspects of sustainable management? (skip question if you hold ISO 9001 certification)",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": [
            {
                "question": "If yes, describe briefly the measures taken",
                "text_labels": [
                    {
                        "label": "",
                        "placeholder": "Enter details here"
                    }
                ],
                "choices": []
            }
        ]
    }
];



export const QUESTION_SET_5 = [
    {
        "question_number": "5",
        "question": "Have you considered taking measures for improved risk management, a cornerstone of several aspects of sustainable management? (skip question if you hold ISO 31000)",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": [
            {
                "question": "If yes, describe briefly the measures taken",
                "text_labels": [
                    {
                        "label": "",
                        "placeholder": "Enter details here"
                    }
                ],
                "choices": []
            }
        ]
    }
];


export const QUESTION_SET_6 = [
    {
        "question_number": "6",
        "question": "Have you achieved compliance with the General Data Protection Regulation (GDPR), a regulation enforced by the EU to ensure legal compliance with a focus on individual rights?",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": []
    },
    {
        "question_number" : "7",
        "question": "Have you taken measures to improve information security? (skip this question if you hold ISO 27001 certification)",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": [
            {
                "question": "If yes, describe briefly the measures taken",
                "text_labels": [
                    {
                        "label": "",
                        "placeholder": "Enter details here"
                    }
                ],
                "choices": []
            }
        ]
    }
];

export const QUESTION_SET_7 = [
    {
        "question_number": "8",
        "question": "Do you hold any sector-specific or particular sustainability certificate in addition to the ones you have already indicated here?",
        "choices": [
            "Yes",
            "No"
        ],
        "choice_type": "radio",
        "has_file": false,
        "text_labels": [],
        "sub_questions": [
            {
                "question": "If yes, please indicate the following:",
                "text_labels": [
                    {
                        "placeholder": "Title of document",
                        "label":""
                    },
                    {
                        "placeholder": "Name of Provider",
                        "label":""
                    },
                    {
                        "placeholder": "Registration Number",
                        "label":"",
                        "input_type": "number"
                    },
                   
                ],
                "choices": []
            }
        ]
    }
];



export const STEPS = [
    {
        "heading":"Environmental",
        "sub_heading":"Sample Text",
    },
    {
        "heading":"Social",
        "sub_heading":"Sample Text",
    },
    {
        "heading":"Governance",
        "sub_heading":"Sample Text",
    },
    {
        "heading":"Sustainable Development Goals", 
        "sub_heading":"Sample Text",
    }

]