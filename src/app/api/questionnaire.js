

import axios from 'axios';

export const fetchQuestionnaire = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/questionnaire`, {
    headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return response.data;
};

export const saveQuestionnaire = async (data) => {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/questionnaire`, data, {
    headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });

  console.log(res);
};