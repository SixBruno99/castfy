import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";
import { Home } from "../../pages/main/home";

export function AuthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
