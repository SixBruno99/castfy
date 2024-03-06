import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

export function AuthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
      </Route>
    </Routes>
  );
}
