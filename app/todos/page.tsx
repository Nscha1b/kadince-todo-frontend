import { Suspense } from "react";
import Todos from "./todos";

export default function Page() {
  return (
    <Suspense>
      <Todos />
    </Suspense>
  );
}