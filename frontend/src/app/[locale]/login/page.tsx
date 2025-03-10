import React, { FC } from "react";
import LocalLogin from "@/components/profile/LocalLogin";
import PageContainer from "@/components/ui/PageContainer";

interface Props {
  params: { locale: string };
}

const LoginPage: FC<Props> = async ({ params }) => {
  return (
    <PageContainer>
      <LocalLogin />
    </PageContainer>
  );
};

export default LoginPage;
