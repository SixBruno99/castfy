export interface IEpisodes {
  id: string;
  description?: string;
  title?: string;
  podcast?: {
    id: string;
    description: string;
    image: {
      url: string;
    };
  };
  image: {
    url: string;
  };
  favorite?: boolean;
  showFavorite?: boolean;
}

export interface IEpisode {
  title?: string;
  description?: string;
  audioUrl?: string;
  imageUrl?: string;
  podcast?: {
    name: string;
    imageUrl: string;
    description: string;
  };
}
