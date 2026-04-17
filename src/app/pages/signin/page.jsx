// app/pages/signin/page.jsx

import { Suspense } from "react";
import SignInClient from "./SignInClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignInClient />
    </Suspense>
  );
}
