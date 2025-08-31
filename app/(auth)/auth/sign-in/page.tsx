import React from "react";
import Image from "next/image";
import { CodeXml } from "lucide-react";
import SignInFormClient from "@/features/auth/components/signin-form-client";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <CodeXml />
      <SignInFormClient />
    </div>
  );
};

export default SignInPage;
