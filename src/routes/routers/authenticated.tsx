import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";
import { Home } from "../../pages/main/home";
import { Listener } from "../../core/layouts/main/components/listener";
 
export function AuthenticatedRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listener/:id/:name/:image" element={<Listener />} />
      </Route>
    </Routes>
  );
}
