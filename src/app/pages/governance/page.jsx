import Governance from "@/app/components/page-components/governance/Governance";
import { Suspense } from "react";

export default function GovernancePage() {
  return (
   <Suspense>
    <Governance />
   </Suspense>
  );
}