import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

// Providers
import { EpisodeProvider } from "../../contexts/episode";

import { Home } from "../../pages/main/home";
import { Search } from "../../pages/main/search";
import { Library } from "../../pages/main/library";
import { Profile } from "../../pages/main/profile";
import { Listener } from "../../core/components/listener";

export function AuthenticatedRouter() {
  return (
    <EpisodeProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/episode/:id" element={<Listener />} />
        </Route>
      </Routes>
    </EpisodeProvider>
  );
}
