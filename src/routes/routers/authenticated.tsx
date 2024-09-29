import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

// Providers
// import { useAuth } from "../../contexts/auth";
import { EpisodeProvider } from "../../contexts/episode";
import { PodcastProvider } from "../../contexts/podcast-upload";
import { CreatePodcastProvider } from "../../contexts/create-podcast";

// Pages
import { Home } from "../../pages/main/home";
import { Search } from "../../pages/main/search";
import { Upload } from "../../pages/main/upload";
import { Library } from "../../pages/main/library";
import { Profile } from "../../pages/main/profile";
import { Listener } from "../../core/components/listener";
import { CreatePodcast } from "../../pages/main/create-podcast";

export function AuthenticatedRouter() {
  // const { userHasPodcast } = useAuth();

  return (
    <CreatePodcastProvider>
      <EpisodeProvider>
        <PodcastProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/library" element={<Library />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/episode/:id" element={<Listener />} />
              <Route path="/create-podcast" element={<CreatePodcast />} />
              {/* {!userHasPodcast && (
                <Route path="/create-podcast" element={<CreatePodcast />} />
              )} */}
            </Route>
          </Routes>
        </PodcastProvider>
      </EpisodeProvider>
    </CreatePodcastProvider>
  );
}
