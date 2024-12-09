import { Suspense } from "react";
import LoginContent from "../../../components/login/loginContent";

const LoginPage = async () => {

  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;