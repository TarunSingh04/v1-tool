import QuestionnaireWelcome from "@/app/components/page-components/questionnaire-welcome/Questionnaire-Welcome";
import { Suspense } from "react";

export default function QuestionnaireWelcomePage() {
  return (
   <Suspense>
    <QuestionnaireWelcome/>
   </Suspense>
  );
}