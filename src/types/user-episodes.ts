export interface IUserData {
  id: string;
  name: string;
  description: string;
  createdAt: Date | string;
  userId: string;
  imageId: string;
  imageUrl: {
    id: string;
    key: string;
    name: string;
    url: string;
    createdAt: string;
  };
  episodes: IUserEpisodes[];
}

export interface IUserEpisodes {
  id: string;
  title: string;
  description: string;
  createdAt: Date | string;
  podcastId: string;
  imageId: string;
  imageUrl: string;
  audioFileId: string;
}
