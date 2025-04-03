import React, { FC } from "react";
import LocalLogin from "@/components/profile/LocalLogin";
import PageContainer from "@/components/ui/PageContainer";
import GoogleLoginButton from "@/components/profile/GoogleLoginBtn";
// import FacebookLoginButton from "@/components/profile/FacebookLoginBtn";

const LoginPage: FC = async () => {
  return (
    <PageContainer>
      <GoogleLoginButton />
      {/* <FacebookLoginButton /> */}
      <LocalLogin />
    </PageContainer>
  );
};

export default LoginPage;
