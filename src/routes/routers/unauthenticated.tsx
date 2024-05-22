import { Route, Routes } from "react-router-dom";
import { SignLayout } from "../../core/layouts/sign";
import { SignIn } from "../../pages/sign/sign-in";
import { SignUp } from "../../pages/sign/sign-up";
import { ForgotPassword } from "../../pages/sign/forgot-password";

export function UnauthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignLayout />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}
