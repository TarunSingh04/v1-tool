import Environment from "@/app/components/page-components/environment/Environment";
import { Suspense } from "react";

export default function EnvironmentPage() {
  return (
   <Suspense>
    <Environment />
   </Suspense>
  );
}