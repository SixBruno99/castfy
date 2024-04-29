import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

import { Home } from "../../pages/main/home";
import { Listener } from "../../core/layouts/main/components/listener";

// roviders
import { EpisodeProvider } from "../../contexts/episode";

export function AuthenticatedRouter() {
  return (
    <EpisodeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/episode/:id" element={<Listener />} />
        </Route>
      </Routes>
    </EpisodeProvider>
  );
}
