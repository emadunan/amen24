import React, { FC } from "react";
import LocalLogin from "@/components/profile/LocalLogin";
import PageContainer from "@/components/ui/PageContainer";

const LoginPage: FC = async () => {
  return (
    <PageContainer>
      <LocalLogin />
    </PageContainer>
  );
};

export default LoginPage;
