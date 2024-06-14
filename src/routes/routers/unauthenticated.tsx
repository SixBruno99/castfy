import { Route, Routes } from "react-router-dom";
import { SignLayout } from "../../core/layouts/sign";
import { SignIn } from "../../pages/sign/sign-in";
import { SignUp } from "../../pages/sign/sign-up";
import { ForgotPassword } from "../../pages/sign/forgot-password";
import { RecoverPassword } from "../../pages/sign/recover-password";
import { CodeValidate } from "../../pages/sign/code-validation";

export function UnauthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/codeValidation" element={<CodeValidate />}/>
        <Route path="/recoverPassword" element={<RecoverPassword />}/>
      </Route>
    </Routes>
  );
}
