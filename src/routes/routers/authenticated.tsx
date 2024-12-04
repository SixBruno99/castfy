import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../../core/layouts/main";

// Providers
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
import { UserEpisodesProvider } from "../../contexts/user-episodes";
import { EditEpisode } from "../../pages/main/edit-episode";

export function AuthenticatedRouter() {
  return (
    <CreatePodcastProvider>
      <EpisodeProvider>
        <PodcastProvider>
          <UserEpisodesProvider>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/create" element={<CreatePodcast />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/episode/:id" element={<Listener />} />
                <Route path="/episode/edit/:id" element={<EditEpisode />} />
              </Route>
            </Routes>
          </UserEpisodesProvider>
        </PodcastProvider>
      </EpisodeProvider>
    </CreatePodcastProvider>
  );
}
