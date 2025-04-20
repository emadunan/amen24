import React, { FC } from "react";
import LocalLogin from "@/components/profile/LocalLogin";
import PageContainer from "@/components/ui/PageContainer";
import GoogleLoginButton from "@/components/profile/GoogleLoginBtn";

const LoginPage: FC = async () => {
  return (
    <PageContainer>
      <GoogleLoginButton />
      <LocalLogin />
    </PageContainer>
  );
};

export default LoginPage;
