import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

import { Home } from "../../pages/main/home";
import { Listener } from "../../core/components/listener";
import { Library } from "../../pages/main/library";

// Providers
import { EpisodeProvider } from "../../contexts/episode";

export function AuthenticatedRouter() {
  return (
    <EpisodeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/episode/:id" element={<Listener />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
    </EpisodeProvider>
  );
}
