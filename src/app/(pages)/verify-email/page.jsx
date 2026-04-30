import React, { Suspense } from "react";
import VerifyEmailClient from "./VerifyEmailClient";

const page = () => {
  return (
    <Suspense fallback="loading...">
      <VerifyEmailClient />
    </Suspense>
  );
};

export default page;
