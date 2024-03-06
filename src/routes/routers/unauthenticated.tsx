import { Route, Routes } from "react-router-dom";
import { SignLayout } from "../../core/layouts/sign";
import { SignIn } from "../../pages/sign/sign-in";

export function UnauthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignLayout />}>
        <Route path="/" element={<SignIn />} />
      </Route>
    </Routes>
  );
}
