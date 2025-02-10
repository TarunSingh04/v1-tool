import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as api from "../../api/questionnaire";

const useQuestionnaireStore = create(
  persist(
    (set, get) => ({
      isLoading: false,
      answers: {
        user_id: "",
        actionType: "saveexit",
        Environment: {
          Q1: { answer: -1, date: "" },
          Q2: { utility_energy_provider: [] },
          Q3: { answer: -1, solar: "", wind: "", biofuels: "", hydropower: "" },
          Q4: { answer: -1, cover_50: "", cover_50_80: "", cover_80: "" },
          Q5: { answer: -1 },
          Q6: { name_water_util: "" },
          Q7: { answer: -1, name: "" },
          Q8: { value: [], rainwater: "", wastewater: "", greywater: "", condensate: "", desalinated: "", reuse: "", other: "" },
          Q9: { answer: -1, pre_treatment: 0, wastewater: 0, microplastics: 0, others: "" },
          Q10: { pollution: [], other: [] },
          Q11: { answer: -1, waste_reduction: [] },
          Q12: { answer: -1, other: "" }
        },
        Social: {
          Q1: { boxes: [], description: "" },
          Q2: { boxes: [], description: "" },
          Q3: { boxes: [], description: "" },
          Q4: { answer: -1 },
          Q5: { value: [""], percentage1: "", percentage2: "" },
          Q6: { value: "" },
          Q7: { answer: -1 },
          Q8: { answer: -1, answer1: 0 },
          Q9: { answer: -1, boxes: [], other: "" },
          Q10: { answer: -1 },
          Q11: { answer: -1, name: "", number: "" },
          Q12: { answer: -1, describe: "" },
          Q13: { answer: -1, describe: "" },
          Q14: { answer: -1, describe: "" },
          Q15: { answer: -1, describe: "" },
          Q16: { answer: -1, describe: "" }
        },
        Governance: {
          Q1: { answer: -1, name: "", year: "" },
          Q2: { answer: -1 },
          Q3: { answer: -1, compensation_package: "" },
          Q4: { answer: -1, measure: "" },
          Q5: { answer: -1, measure: "" },
          Q6: { answer: -1 },
          Q7: { answer: -1, measure: "" },
          Q8: { answer: -1, sector_certificate: [] }
        },
        sdg: { Q0: [], Q1: [] }
      },
      error: "",
      isLoading: false,

      fetchQuestionnaire: async () => {
        set({isLoading: true});
        try {
          const data = await api.fetchQuestionnaire();
          console.log(data);
          delete data["_id"];
          set({ answers: data});
          set({isLoading: false});
        } catch (e) {
          console.log(e);
          set({ error: e,isLoading: false });
        }
      },

      addAnswer: (answers) => {
        const updatedAnswers = get().answers;
        updatedAnswers[answers.type][answers.question_number] = answers.answer;
        console.log(answers);
        console.log(updatedAnswers);
        set({ answers: updatedAnswers });
      },

      saveQuestionnaire: async () => {
        const finalAnswers = {...get().answers};
        finalAnswers.actionType = "saveexit";
        
        console.log(finalAnswers);
        try{
          await api.saveQuestionnaire(finalAnswers);
        }catch(e){
            console.log(e);
        }
      },

      submitQuestionnaire: async () => {
        const finalAnswers = {...get().answers};
        finalAnswers.actionType = "submit";
        delete finalAnswers.sdg.Q0;
        
        console.log(finalAnswers);
        try{
          await api.saveQuestionnaire(finalAnswers);
          localStorage.removeItem("questionnaire-storage");
        }catch(e){
          console.log(e);
        }
      }
    }),
    {
      name: "questionnaire-storage", // Key for localStorage
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);

export default useQuestionnaireStore;
